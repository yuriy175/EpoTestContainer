﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Serilog;

namespace MiniViewerWrapper.BL.Remoting
{
    /// <summary>
    /// configuration interface
    /// </summary>
    public class ImagePropsSignalRHub : SignalRHub
    {
        private readonly ILogger _logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="ImagePropsSignalRHub"/> class.
        /// </summary>
        /// <param name="logger">logger</param>
        public ImagePropsSignalRHub(ILogger logger)
            : base(logger)
            => _logger = logger;
    }
}
