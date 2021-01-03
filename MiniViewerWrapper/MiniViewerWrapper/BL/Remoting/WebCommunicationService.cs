using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using MiniViewerWrapper.BL.Interfaces;
using Newtonsoft.Json;
using Serilog;

namespace MiniViewerWrapper.BL.Remoting
{
    /// <summary>
    /// signalR clients communication service
    /// </summary>
    /// <typeparam name="THub">signalR hub type</typeparam>
    public class WebCommunicationService<THub> : IWebCommunicationService<THub>
        where THub : SignalRHub
    {
        private readonly ILogger _logger;
        private readonly THub _hub;

        /// <summary>
        /// public constructor
        /// </summary>
        /// <param name="logger">logger</param>
        public WebCommunicationService(
            ILogger logger,
            THub hub)
        {
            _logger = logger;
            _hub = hub;
        }

        /// <summary>
        /// sends a string 
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        public Task<bool> Send(string message, string userName = null)
        {
            _logger.Information($"Send new message: {message}");
            return _hub?.Send(message, userName);
        }

        /// <summary>
        /// sends an impotant string 
        /// </summary>
        /// <param name="messageType">message type</param>
        /// <param name="message">message</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        public Task<bool> SendImportant(string messageType, string message, string userName = null)
        {
            _logger.Information($"Send new message: {message}");
            return _hub?.SendImportant(messageType, message, userName);
        }

        /// <summary>
        /// sends an image bytes
        /// </summary>
        /// <param name="image">image bytes</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        public Task<bool> SendImage(byte[] image, string userName = null)
        {
            var message = "data:image/bmp;base64," + Convert.ToBase64String(image);
            return _hub?.Send(message, userName);
        }

        /// <summary>
        /// sends an image frame
        /// </summary>
        /// <param name="frameInfo">frame info</param>
        /// <param name="imageData">image bytes</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        public async Task<bool> SendImageFrame((int FrameNumber, double WindowWidth, double WindowCenter, int FrameGridNumber) frameInfo, byte[] imageData, string userName = null)
        {
            if (imageData == null)
                return false;

            var frameData = new { FrameGridNumber = frameInfo.FrameGridNumber, FrameNum = frameInfo.FrameNumber, WindowWidth = frameInfo.WindowWidth, WindowCenter = frameInfo.WindowCenter, ImageData = "data:image/bmp;base64," + Convert.ToBase64String(imageData) };
            var message = JsonConvert.SerializeObject(frameData);

            return await _hub?.Send(message, userName);
        }
    }
}
