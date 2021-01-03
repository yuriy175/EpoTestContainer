using MiniViewerWrapper.BL.Remoting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MiniViewerWrapper.BL.Interfaces
{
    /// <summary>
    /// signalR clients communication interface
    /// </summary>
    public interface IWebCommunicationService
    {
        /// <summary>
        /// sends a string 
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        Task<bool> Send(string message, string userName = null);

        /// <summary>
        /// sends an image bytes
        /// </summary>
        /// <param name="image">image bytes</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        Task<bool> SendImage(byte[] image, string userName = null);

        /// <summary>
        /// sends an image frame
        /// </summary>
        /// <param name="frameInfo">frame info</param>
        /// <param name="imageData">image bytes</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        Task<bool> SendImageFrame((int FrameNumber, double WindowWidth, double WindowCenter, int FrameGridNumber) frameInfo, byte[] imageData, string userName = null);

        /// <summary>
        /// sends an impotant string 
        /// </summary>
        /// <param name="messageType">message type</param>
        /// <param name="message">message</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        Task<bool> SendImportant(string messageType, string message, string userName = null);
    }

    /// <summary>
    /// signalR clients communication interface
    /// </summary>
    /// <typeparam name="THub">signalR hub type</typeparam>
    public interface IWebCommunicationService<THub> : IWebCommunicationService
        where THub : SignalRHub
    {
    }
}
