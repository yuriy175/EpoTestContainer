using AtlasMiniViewerWPF.Core.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL.Interfaces
{
    public interface IImageManipulationWrapper
    {
        /// <summary>
        /// Loads image.
        /// </summary>
        /// <param name="imagePath">path of image.</param>
        /// <returns>image id</returns>
        Task<bool> LoadImageAsync(string imagePath);

        /// <summary>
        /// plays image
        /// </summary>
        /// <returns>result</returns>
        Task<bool> PlayImageAsync();

        /// <summary>
        /// stops playing image 
        /// </summary>
        /// <returns>result</returns>
        Task<bool> StopPlayingAsync();

        /// <summary>
        /// sets frame rate
        /// </summary>
        /// <param name="frameRate">frame rate</param>
        /// <returns>result</returns>
        Task<bool> SetFrameRateAsync(float? frameRate);

        /// <summary>
        /// gets image info
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>image info</returns>
        Task<IEnumerable<(string, string)>> GetImageInfoAsync();

        /// <summary>
        /// gets dcm files
        /// </summary>
        /// <param name="subDirPath">subdir path</param>
        /// <returns>dcm files</returns>
        Task<IEnumerable<string>> GetDcmFilesAsync(string subDirPath);

        /// <summary>
        /// sets desired image size
        /// </summary>
        /// <param name="desiredWidth">desired width</param>
        /// <param name="desiredHeight">desired height</param>
        void SetImageSize(double desiredWidth, double desiredHeight);

        /// <summary>
        /// selects image
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        Task<bool> SelectImageAsync(string imageId);

        /// <summary>
        /// rotates image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        Task<bool> RotateImageAsync();

        /// <summary>
        /// hor flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        Task<bool> HorFlipImageAsync();

        /// <summary>
        /// vert flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        Task<bool> VertFlipImageAsync();

        /// <summary>
        /// invert image 
        /// </summary>
        /// <returns>result</returns>
        Task<bool> InvertImageAsync();

        /// <summary>
        /// undo image 
        /// </summary>
        /// <returns>result</returns>
        Task<bool> UndoImageTransformsAsync();

        /// <summary>
        /// Loads image preview only.
        /// </summary>
        /// <param name="imagePath">path of image.</param>
        /// <param name="previewSize">preview size</param>
        /// <returns>image info</returns>
        Task<string> LoadPreviewOnlyAsync(string imagePath, int previewSize);

        /// <summary>
        /// plays first frame
        /// </summary>
        /// <returns>result</returns>
        Task<bool> PlayFirstAsync();

        /// <summary>
        /// plays prev frame
        /// </summary>
        /// <returns>result</returns>
        Task<bool> PlayPrevAsync();

        /// <summary>
        /// plays exact frame
        /// </summary>
        /// <param name="frameNumber">frame number</param>
        /// <returns>result</returns>
        Task<bool> PlayExactAsync(uint frameNumber);

        /// <summary>
        /// plays next frame
        /// </summary>
        /// <returns>result</returns>
        Task<bool> PlayNextAsync();

        /// <summary>
        /// plays last frame
        /// </summary>
        /// <returns>result</returns>
        Task<bool> PlayLastAsync();

        /// <summary>
        /// scales image up
        /// </summary>
        /// <returns>result</returns>
        Task<bool> ScaleUpImageAsync();

        /// <summary>
        /// scales image down
        /// </summary>
        /// <returns>result</returns>
        Task<bool> ScaleDownImageAsync();

        /// <summary>
        /// sets image WL
        /// </summary>
        /// <param name="centerUp">increase window center</param>
        /// <param name="widthUp">increase window width</param>
        /// <returns>result</returns>
        Task<bool> SetImageWindowLevelAsync(bool? centerUp = null, bool? widthUp = null);
    }
}
