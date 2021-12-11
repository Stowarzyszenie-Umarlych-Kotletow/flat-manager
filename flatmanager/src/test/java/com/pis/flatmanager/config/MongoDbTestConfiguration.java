package com.pis.flatmanager.config;

import de.flapdoodle.embed.mongo.Command;
import de.flapdoodle.embed.mongo.config.Defaults;
import de.flapdoodle.embed.process.config.RuntimeConfig;
import de.flapdoodle.embed.process.config.io.ProcessOutput;
import de.flapdoodle.embed.process.config.store.DownloadConfig;
import de.flapdoodle.embed.process.config.store.ImmutableDownloadConfig;
import de.flapdoodle.embed.process.io.Processors;
import de.flapdoodle.embed.process.io.Slf4jLevel;
import de.flapdoodle.embed.process.io.progress.Slf4jProgressListener;
import de.flapdoodle.embed.process.store.ExtractedArtifactStore;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.boot.autoconfigure.mongo.embedded.DownloadConfigBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.stream.Stream;

@Configuration
public class MongoDbTestConfiguration {

    private static final String IP = "localhost";
    private static final int PORT = 28017;
    private static final String MONGO_DB_NAME = "flatmanager";

    @Bean
    RuntimeConfig embeddedMongoRuntimeConfig(
            ObjectProvider<DownloadConfigBuilderCustomizer> downloadConfigBuilderCustomizers) {
        Logger logger = LoggerFactory.getLogger(getClass().getPackage().getName() + ".EmbeddedMongo");
        ProcessOutput processOutput = ProcessOutput.builder()
                .output(Processors.logTo(logger, Slf4jLevel.INFO))
                .error(Processors.logTo(logger, Slf4jLevel.ERROR))
                .commands(Processors.named("[console>]", Processors.logTo(logger, Slf4jLevel.DEBUG)))
                .build();
        return Defaults.runtimeConfigFor(Command.MongoD, logger).processOutput(processOutput)
                .artifactStore(getArtifactStore(logger, downloadConfigBuilderCustomizers.orderedStream()))
                .isDaemonProcess(false).build();
    }

    private ExtractedArtifactStore getArtifactStore(Logger logger,
                                                    Stream<DownloadConfigBuilderCustomizer> downloadConfigBuilderCustomizers) {
        ImmutableDownloadConfig.Builder downloadConfigBuilder = Defaults.downloadConfigFor(Command.MongoD);
        downloadConfigBuilder.progressListener(new Slf4jProgressListener(logger));
        downloadConfigBuilderCustomizers.forEach((customizer) -> customizer.customize(downloadConfigBuilder));
        DownloadConfig downloadConfig = downloadConfigBuilder.build();
        return Defaults.extractedArtifactStoreFor(Command.MongoD).withDownloadConfig(downloadConfig);
    }

}
