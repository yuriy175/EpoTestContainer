using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using AtlasMiniViewerWPF.Core.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Connections;
using MiniViewerWrapper.BL.Interfaces;
using MiniViewerWrapper.BL.Remoting;

namespace MiniViewerWrapper
{
    /// <summary>
    /// ApplicationBuilderExtensions
    /// </summary>
    public static class ApplicationBuilderExtensions
    {
        /// <summary>
        /// Use remoting service
        /// </summary>        
        /// <typeparam name="T">hub type</typeparam>
        /// <param name="app">application builder </param>
        /// <param name="hubPath">hub path</param>
        /// <returns>updated application builder</returns>
        public static IApplicationBuilder UseRemotingServices<T>(this IApplicationBuilder app, string hubPath)
            where T : SignalRHub
        {
            var hub = app.ApplicationServices.GetService(typeof(T));
            _ = app.UseSignalR(routes =>
              {
                  routes.MapHub<T>(
                      hubPath,
                      options =>
                      {
                          options.Transports = HttpTransportType.WebSockets;
                      });
              });

            return app;
        }

        /// <summary>
        /// Use journal service
        /// </summary>
        /// <param name="app">application builder </param>
        /// <returns>updated application builder</returns>
        public static IApplicationBuilder UseViewerServices(this IApplicationBuilder app)
        {
            app.ApplicationServices.GetService(typeof(IImageManipulation<Bitmap>));
            app.ApplicationServices.GetService(typeof(IRemotingProvider));

            return app;
        }
    }
}
