using AtlasMiniViewerWPF.Core.Interfaces;
using AtlasMiniViewerWPF.Core.Model;
using MiniViewerWrapper.BL.Interfaces;
using MiniViewerWrapper.BL.Remoting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL
{
    public class RemotingProvider : IRemotingProvider
    {
        private readonly IEventPublisher _eventPublisher = null;
        private readonly IWebCommunicationService _webCommunicationService;
        private readonly IWebCommunicationService<ImagePropsSignalRHub> _webImagePropsCommunicationService;

        public RemotingProvider(
            IEventPublisher eventPublisher,
            IWebCommunicationService webCommunicationService,
            IWebCommunicationService<ImagePropsSignalRHub> webImagePropsCommunicationService)
        {
            _eventPublisher = eventPublisher;
            _webCommunicationService = webCommunicationService;
            _webImagePropsCommunicationService = webImagePropsCommunicationService;

            _eventPublisher.RegisterAddDicomDirEvent(OnAddDicomDir);
            _eventPublisher.RegisterCloseDicomDirEvent(OnCloseDicomDir);
            _eventPublisher.RegisterCloseImageEvent(OnCloseImage);
            _eventPublisher.RegisterUpdateImageEvent<Bitmap>(OnImageUpdate);
        }

        private void OnCloseImage(string obj)
        {
            OnCloseImage();
        }

        private void OnCloseDicomDir()
        {
            OnCloseImage();
        }

        private void OnAddDicomDir(DicomDirInfo info)
        {
            SendInfoAsync(new { Type = "DicomDirInfo", Data = info });
        }

        private void OnImageUpdate(BitmapInfo<Bitmap> image)
        {
            /*if (image != null && image.Info != null)
            {
                CanWLManipulate = image.Info == null ? false : !image.Info.UseVOILUT;
            }*/

            if (image == null || image.Image == null)
            {
                OnCloseImage();
            }
            else
            {
                var bitmap = image.Image;
                try
                {
                    using (bitmap)
                    {
                        //using var framesBitmap8 = bitmap.Clone(
                        //        new Rectangle(0, 0, bitmap.Width, bitmap.Height),
                        //        PixelFormat.Format8bppIndexed);
                        //using var framesBitmap8 = ToGrayscale(bitmap);

                        /*using var stream = new MemoryStream();
                        //framesBitmap8.Save(stream, ImageFormat.Png);
                        bitmap.Save(stream, ImageFormat.Png);
                        var arr = stream.ToArray();
                        var sigBase64 = Convert.ToBase64String(arr);
                        var content = "data:image/png;base64," + sigBase64;*/
                        var content = bitmap.ToBase64();
                        SendImage(content);

                        var info = new { Type = "FrameNumber", Data = image.FrameNumber };
                        SendInfoAsync(info);
                    }
                }
                catch (Exception ex)
                {
                }
            }

            if (image != null && image.Info != null)
            {
                var info = new { Type = "ImageInfo", Data = image.Info };
                SendInfoAsync(info);
            }
        }

        public static Bitmap ToGrayscale(Bitmap bmp)
        {
            var result = new Bitmap(bmp.Width, bmp.Height, PixelFormat.Format8bppIndexed);

            BitmapData data = result.LockBits(new Rectangle(0, 0, result.Width, result.Height), ImageLockMode.WriteOnly, PixelFormat.Format8bppIndexed);

            // Copy the bytes from the image into a byte array
            byte[] bytes = new byte[data.Height * data.Stride];
            Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    var c = bmp.GetPixel(x, y);
                    var rgb = (byte)((c.R + c.G + c.B) / 3);

                    bytes[x * data.Stride + y] = rgb;
                }
            }

            // Copy the bytes from the byte array into the image
            Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);

            result.UnlockBits(data);

            return result;
        }

        private void OnCloseImage()
        {
            //DispatcherHelper.Run(() => 
            //ImageSource = null;//);
        }

        private void SendInfoAsync<T>(T state)
        {
            Task.Run(() =>
            {
                var content = JsonConvert.SerializeObject(state);
                _webImagePropsCommunicationService.Send(content);
            });
        }

        private void SendImage(string image)
        {
            _webCommunicationService.Send(image);
        }

        private void SendImageFrame(int frameNumber, string imageData)
        {
            var frameData = new { frameNumber, imageData };
            var message = JsonConvert.SerializeObject(frameData);

            _webCommunicationService.Send(message);
        }
    }
}
