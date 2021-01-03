using AtlasMiniViewerWPF.Core.Interfaces;
using Dicom.Imaging;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL
{
    class BitmapProvider : IBitmapProvider<Bitmap>
    {
        public BitmapProvider()
        {
            //ImageManager.SetImplementation(new WPFImageManager());
            ImageManager.SetImplementation(new WinFormsImageManager());
        }

        public Bitmap AsBitmap(IImage image)
        {
            return (image as WinFormsImage).AsClonedBitmap();
        }

        public Bitmap Invert(Bitmap image)
        {
            //throw new NotImplementedException();
            return image;
        }
    }
}
