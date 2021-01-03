using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System.IO;
using MiniViewerWrapper.BL.Interfaces;
using Dicom;
using System;
using System.Collections.Generic;

namespace AtlasMiniViewer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MiniViewerController : ControllerBase
    {
        private readonly IImageManipulationWrapper _imageManipulation;
        private readonly ILogger _logger;

        /// <summary>
        /// public constructor.
        /// </summary>
        /// <param name="logger">logger</param>
        /// <param name="profileService">profile service</param>
        public MiniViewerController(IImageManipulationWrapper imageManipulation)//ILogger logger)//, IHelpService helpService)
        {
            _imageManipulation = imageManipulation;
            //_logger = logger;
        }

        /// <summary>
        /// gets dcm files
        /// </summary>
        /// <param name="subDirPath">subdir path</param>
        /// <returns>result with dcm files</returns>
        [HttpGet]
        [Route("GetDcmFiles")]
        public async Task<ActionResult> GetDcmFilesAsync(string subDirPath)
        {
            return await ToActionResultAsync(() =>
                _imageManipulation.GetDcmFilesAsync(subDirPath));
        }

        /// <summary>
        /// load image
        /// </summary>
        /// <returns>result</returns>
        [HttpGet]
        [Route("LoadImage")]
        public async Task<ActionResult> LoadImageAsync(string fileName)
        {
            return await ToActionResultAsync(() => 
                _imageManipulation.LoadImageAsync(fileName));
        }

        /// <summary>
        /// plays image
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayImage")]
        public async Task<ActionResult> PlayNextFrameAsync(int imageId)
        {
            return await ToActionResultAsync(() => _imageManipulation.PlayImageAsync());
        }

        /// <summary>
        /// stops playing image 
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("StopPlaying")]
        public async Task<ActionResult> StopPlayingAsync(int imageId)
        {
            return await ToActionResultAsync(() => _imageManipulation.StopPlayingAsync());
        }

        /// <summary>
        /// sets frame rate
        /// </summary>
        /// <param name="frameRate">frame rate</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("SetFrameRate")]
        public async Task<ActionResult> SetFrameRateAsync(float frameRate = 8)
        {
            return await ToActionResultAsync(() => _imageManipulation.SetFrameRateAsync(frameRate));
        }

        /// <summary>
        /// sets desired image size
        /// </summary>
        /// <param name="desiredWidth">desired width</param>
        /// <param name="desiredHeight">desired height</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("SetImageSize")]
        public ActionResult SetImageSize(double desiredWidth, double desiredHeight)
        {
            _imageManipulation.SetImageSize(desiredWidth, desiredHeight);
            return Ok();
        }

        /// <summary>
        /// selects image
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("SelectImage")]
        public async Task<ActionResult> SelectImageAsync(string imageId) =>
            await ToActionResultAsync(() => _imageManipulation.SelectImageAsync(imageId));

        /// <summary>
        /// rotates image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("RotateImage")]
        public async Task<ActionResult> RotateImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.RotateImageAsync());

        /// <summary>
        /// hor flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("HorFlipImage")]
        public async Task<ActionResult> HorFlipImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.HorFlipImageAsync());

        /// <summary>
        /// vert flips image 
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("VertFlipImage")]
        public async Task<ActionResult> VertFlipImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.VertFlipImageAsync());

        /// <summary>
        /// invert image 
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("InvertImage")]
        public async Task<ActionResult> InvertImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.InvertImageAsync());

        /// <summary>
        /// undo image 
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("UndoImageTransforms")]
        public async Task<ActionResult> UndoImageTransformsAsync() =>
            await ToActionResultAsync(() => _imageManipulation.UndoImageTransformsAsync());

        /// <summary>
        /// gets image info
        /// </summary>
        /// <param name="imageId">id of image.</param>
        /// <returns>result with image info</returns>
        [HttpGet]
        [Route("GetImageInfo")]
        public async Task<ActionResult> GetImageInfoAsync() =>
            await ToActionResultAsync(() => _imageManipulation.GetImageInfoAsync());


        /// <summary>
        /// Loads image preview only.
        /// </summary>
        /// <param name="imagePath">path of image.</param>
        /// <param name="previewSize">preview size</param>
        /// <returns>result with image info</returns>
        [HttpGet]
        [Route("LoadPreviewOnly")]
        public async Task<ActionResult> LoadPreviewOnlyAsync(string imagePath, int previewSize) =>
            await ToActionResultAsync(() => _imageManipulation.LoadPreviewOnlyAsync(imagePath, previewSize));

        /// <summary>
        /// plays first frame
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayFirst")]
        public async Task<ActionResult> PlayFirstAsync() =>
            await ToActionResultAsync(() => _imageManipulation.PlayFirstAsync());

        /// <summary>
        /// plays prev frame
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayPrev")]
        public async Task<ActionResult> PlayPrevAsync() =>
            await ToActionResultAsync(() => _imageManipulation.PlayPrevAsync());

        /// <summary>
        /// plays exact frame
        /// </summary>
        /// <param name="frameNumber">frame number</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayExact")]
        public async Task<ActionResult> PlayExactAsync(uint frameNumber) =>
            await ToActionResultAsync(() => _imageManipulation.PlayExactAsync(frameNumber));

        /// <summary>
        /// plays next frame
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayNext")]
        public async Task<ActionResult> PlayNextAsync() =>
            await ToActionResultAsync(() => _imageManipulation.PlayNextAsync());

        /// <summary>
        /// plays last frame
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("PlayLast")]
        public async Task<ActionResult> PlayLastAsync() =>
           await ToActionResultAsync(() => _imageManipulation.PlayLastAsync());

        /// <summary>
        /// scales image up
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("ScaleUp")]
        public async Task<ActionResult> ScaleUpImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.ScaleUpImageAsync());

        /// <summary>
        /// scales image down
        /// </summary>
        /// <returns>result</returns>
        [HttpPost]
        [Route("ScaleDown")]
        public async Task<ActionResult> ScaleDownImageAsync() =>
            await ToActionResultAsync(() => _imageManipulation.ScaleDownImageAsync());

        /// <summary>
        /// sets image WL
        /// </summary>
        /// <param name="centerUp">increase window center</param>
        /// <param name="widthUp">increase window width</param>
        /// <returns>result</returns>
        [HttpPost]
        [Route("SetImageWindowLevel")]
        public async Task<ActionResult> SetImageWindowLevelAsync(bool? centerUp = null, bool? widthUp = null) =>
            await ToActionResultAsync(() => _imageManipulation.SetImageWindowLevelAsync(centerUp, widthUp)); 

        private async Task<ActionResult> ToActionResultAsync(Func<Task<bool>> action)
        {
            if (await action().ConfigureAwait(false))
                return Ok();
            return StatusCode(500);
        }

        private async Task<ActionResult> ToActionResultAsync<T>(Func<Task<T>> action)
            where T : class
        {
            T value = await action();
            if (value != default(T))
                return new JsonResult(value);
            return StatusCode(500);
        }
    }
}
