using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL
{
    internal static class Extensions
    {
        public static string ToBase64(this Bitmap bitmap)
        {
            using var stream = new MemoryStream();
            bitmap.Save(stream, ImageFormat.Png);
            var arr = stream.ToArray();
            var sigBase64 = Convert.ToBase64String(arr);
            var content = "data:image/png;base64," + sigBase64;

            return content;
        }
    }
}
