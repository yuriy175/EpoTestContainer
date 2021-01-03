using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;
using AtlasMiniViewerWPF.Core;
using AtlasMiniViewerWPF.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using MiniViewerWrapper.BL;
using MiniViewerWrapper.BL.Interfaces;
using MiniViewerWrapper.BL.Remoting;
using Serilog;

namespace MiniViewerWrapper
{
    /// <summary>
    /// Extension methods for service collection.
    /// </summary>
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Add logger service.
        /// </summary>
        /// <param name="services">service collection.</param>
        /// <param name="pathToLog">path to log.</param>
        /// <returns>updated service collection.</returns>
        public static IServiceCollection AddLoggerService(
            this IServiceCollection services,
            string pathToLog)
        {
            var logger = new LoggerConfiguration()
               .WriteTo.RollingFile(pathToLog).CreateLogger();

            return services.AddSingleton(typeof(ILogger), logger);
        }

        /// <summary>
        /// Add remoting services
        /// </summary>
        /// <param name="services">service collection</param>
        /// <returns>updated service collection</returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddSingleton(
                typeof(IEventPublisher),
                typeof(EventPublisher));

            services.AddSingleton(
                typeof(IBitmapProvider<Bitmap>),
                typeof(BitmapProvider));

            services.AddSingleton(
                typeof(IImageManipulation<Bitmap>),
                typeof(ImageManipulation<Bitmap>));

            services.AddSingleton(
                typeof(IRemotingProvider),
                typeof(RemotingProvider));

            services.AddSingleton(
               typeof(IImageManipulationWrapper),
               typeof(ImageManipulationWrapper));

            return services;
        }

        /// <summary>
        /// Add remoting services
        /// </summary>
        /// <param name="services">service collection</param>
        /// <returns>updated service collection</returns>
        public static IServiceCollection AddRemotingServices(this IServiceCollection services)
        {
            services.AddSignalR();
            services.AddSingleton(typeof(SignalRHub));

            services.AddSingleton(typeof(ImagePropsSignalRHub));

            services.AddSingleton(
                typeof(IWebCommunicationService),
                typeof(WebCommunicationService<SignalRHub>));

            services.AddSingleton(
                typeof(IWebCommunicationService<ImagePropsSignalRHub>),
                typeof(WebCommunicationService<ImagePropsSignalRHub>));

            return services;
        }
    }
}
