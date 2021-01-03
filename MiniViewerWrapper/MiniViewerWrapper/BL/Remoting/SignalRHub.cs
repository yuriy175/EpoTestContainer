using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Serilog;

namespace MiniViewerWrapper.BL.Remoting
{
    /// <summary>
    /// configuration interface
    /// </summary>
    public class SignalRHub : Hub
    {
        private readonly ILogger _logger;
        private readonly ConcurrentDictionary<string, string> _postponedMessages = new ConcurrentDictionary<string, string> { };

        /// <summary>
        /// Initializes a new instance of the class.
        /// </summary>
        /// <param name="logger">logger</param>
        public SignalRHub(ILogger logger) => _logger = logger;

        /// <inheritdoc/>
        public override async Task OnConnectedAsync()
        {
            _logger?.Information($"OnConnectedAsync {Context.ConnectionId}");
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} entered hub");
            await base.OnConnectedAsync();
            PurgePostponedMessages();
        }

        private void PurgePostponedMessages()
        {
            var keys = _postponedMessages.Keys.ToList();
            keys.ForEach(async k =>
            {
                if (_postponedMessages.TryRemove(k, out string message))
                {
                    await Send(message);
                }
            });
        }

        /// <inheritdoc/>
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            _logger?.Information($"OnDisconnectedAsync {Context.ConnectionId}");
            await Clients.All.SendAsync("Notify", $"{Context.ConnectionId} left hub");
            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// sends a string 
        /// </summary>
        /// <param name="message">message</param>
        /// <param name="userName">user name</param>
        /// <returns>result</returns>
        public async Task<bool> Send(string message, string userName = null)
        {
            try
            {
                if (Clients == null)
                {
                    _logger?.Error("no clients");
                    return false;
                }

                if (Clients.Caller == null)
                {
                    _logger?.Information("no caller. Broadcasting " + message);
                    await Clients.Others.SendAsync("Send", message);
                    return true;
                }

                if (string.IsNullOrEmpty(userName))
                    await Clients.Caller.SendAsync("Send", message);
                else
                    await Clients.User(userName)?.SendAsync("Send", message);
                return true;
            }
            catch (Exception ex)
            {
                _logger?.Error(ex, "SignalRHub error ");
                return false;
            }
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
            try
            {
                if (Clients == null)
                {
                    _logger?.Information($"SendImportant for no clients {messageType} {message}");
                    _postponedMessages.AddOrUpdate(messageType, message, (k, v) => message);
                    return Task.FromResult(false);
                }
                else
                {
                    return Send(message, userName);
                }
            }
            catch (Exception ex)
            {
                _logger?.Error(ex, "SignalRHub error ");
                return Task.FromResult(false); 
            }
        }

        /// <inheritdoc/>
        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
        }
    }
}
