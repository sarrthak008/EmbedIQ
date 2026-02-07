# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
# Paths are relative to the ROOT directory (inner 'server' folder)
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring
# Jar name must match artifactId and version in your pom.xml
COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
# Essential for Render's 512MB RAM free tier
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-Xmx400m", "-Xms400m", "-jar", "app.jar"]