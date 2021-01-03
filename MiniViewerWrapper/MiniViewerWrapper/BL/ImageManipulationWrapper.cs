using AtlasMiniViewerWPF.Core.Interfaces;
using MiniViewerWrapper.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL
{
    public class ImageManipulationWrapper : IImageManipulationWrapper
    {
        private const string DicomDirname = "DICOMDIR";
        private const string DCMRepositoryPath = @"D:\MiniViewer";

        private readonly IEventPublisher _eventPublisher = null;
        private readonly IImageManipulation<Bitmap> _service = null;

        public ImageManipulationWrapper(
            IEventPublisher eventPublisher,
            IImageManipulation<Bitmap> service)
        {
            _eventPublisher = eventPublisher;
            _service = service;
        }

        /// <summary>
        /// Loads image.
        /// </summary>
        /// <param name="imagePath">path of image.</param>
        /// <returns>image id</returns>
        public async Task<bool> LoadImageAsync(string imagePath)
        {
            var isDicomDir = Path.GetFileNameWithoutExtension(imagePath).ToUpper() == DicomDirname;
            var loadResult = true;
            if (isDicomDir)
            {
                loadResult = await _service.LoadDicomDirAsync(imagePath);
            }
            else
            {
                loadResult = !string.IsNullOrEmpty(await _service.LoadImageAsync(imagePath));
            }

            return loadResult;
        }

        /// <summary>
        /// gets dcm files
        /// </summary>
        /// <param name="subDirPath">subdir path</param>
        /// <returns>dcm files</returns>
        public async Task<IEnumerable<string>> GetDcmFilesAsync(string subDirPath)
        {
            return Directory.GetFiles(
                Path.Combine(DCMRepositoryPath, subDirPath ?? string.Empty),
                "*.dcm", SearchOption.TopDirectoryOnly);            
        }

        /// <summary>
        /// plays image
        /// </summary>
        /// <returns>result</returns>
        public async Task<bool> PlayImageAsync()
        {
            return await _service.PlayImageAsync();
        }

        /// <summary>
        /// stops playing image 
        /// </summary>
        /// <returns>result</returns>
        public async Task<bool> StopPlayingAsync()
        {
            return await _service.StopPlayingAsync();
        }

        /// <summary>
        /// sets frame rate
        /// </summary>
        /// <param name="frameRate">frame rate</param>
        /// <returns>result</returns>
        public async Task<bool> SetFrameRateAsync(float? frameRate)
        {
            return await _service.SetFrameRateAsync(frameRate);
        }

        /// <summary>
        /// sets desired image size
        /// </summary>
        /// <param name="desiredWidth">desired width</param>
        /// <param name="desiredHeight">desired height</param>
        public void SetImageSize(double desiredWidth, double desiredHeight) => 
            _service.SetImageSize(desiredWidth, desiredHeight);

        /// <summary>
        /// selects image
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        public Task<bool> SelectImageAsync(string imageId) => 
            _service.SelectImageAsync(imageId);

        /// <summary>
        /// rotates image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        public Task<bool> RotateImageAsync() =>
            _service.RotateImageAsync();

        /// <summary>
        /// hor flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        public Task<bool> HorFlipImageAsync() =>
            _service.HorFlipImageAsync();

        /// <summary>
        /// vert flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        public Task<bool> VertFlipImageAsync() =>
             _service.VertFlipImageAsync();

        /// <summary>
        /// invert image 
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> InvertImageAsync() => 
            _service.InvertImageAsync();

        /// <summary>
        /// undo image 
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> UndoImageTransformsAsync() =>
            _service.UndoImageTransformsAsync();

        /// <summary>
        /// gets image info
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>image info</returns>
        public Task<IEnumerable<(string, string)>> GetImageInfoAsync() =>
            _service.GetImageInfoAsync();

        /// <summary>
        /// Loads image preview only.
        /// </summary>
        /// <param name="imagePath">path of image.</param>
        /// <param name="previewSize">preview size</param>
        /// <returns>image info</returns>
        public async Task<string> LoadPreviewOnlyAsync(string imagePath, int previewSize)
        {
            var info = await _service.LoadPreviewOnlyAsync(imagePath);

            var image = info?.Image;
            if (image != null)
            {
                using var preview = new Bitmap(image, previewSize, previewSize);
                var content = preview.ToBase64();
                return content;
            }

            return null;
        }

        /// <summary>
        /// plays first frame
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> PlayFirstAsync() =>
            _service.PlayFirstAsync();

        /// <summary>
        /// plays prev frame
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> PlayPrevAsync() =>
            _service.PlayPrevAsync();

        /// <summary>
        /// plays exact frame
        /// </summary>
        /// <param name="frameNumber">frame number</param>
        /// <returns>result</returns>
        public Task<bool> PlayExactAsync(uint frameNumber) =>
            _service.PlayExactAsync(frameNumber);

        /// <summary>
        /// plays next frame
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> PlayNextAsync() =>
            _service.PlayNextAsync();

        /// <summary>
        /// plays last frame
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> PlayLastAsync() =>
            _service.PlayLastAsync();

        /// <summary>
        /// scales image up
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> ScaleUpImageAsync() =>
            _service.ScaleImageAsync(true);

        /// <summary>
        /// scales image down
        /// </summary>
        /// <returns>result</returns>
        public Task<bool> ScaleDownImageAsync() =>
            _service.ScaleImageAsync(false);

        /// <summary>
        /// sets image WL
        /// </summary>
        /// <param name="centerUp">increase window center</param>
        /// <param name="widthUp">increase window width</param>
        /// <returns>result</returns>
        public Task<bool> SetImageWindowLevelAsync(bool? centerUp = null, bool? widthUp = null) =>
            _service.SetImageWindowLevelAsync(centerUp, widthUp);
    }
}
