# --- STAGE 1: BUILD ---
# Use a full Maven image to build the app
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 1. Copy the pom.xml from the subfolder to the build container
# This is a "cheat" to cache your dependencies (saves ~2 minutes per build)
COPY server/pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy the actual source code
COPY server/src ./src

# 3. Compile and package the JAR file
# We skip tests to make the build faster on free-tier CPUs
RUN mvn clean package -DskipTests

# --- STAGE 2: RUNTIME ---
# Use a lightweight JRE (Runtime) image for the final app
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user for security (best practice for 2026)
RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# 4. Copy the JAR from the build stage
# Maven generates the JAR in the 'target' folder based on your artifactId
COPY --from=build /app/target/server-0.0.1-SNAPSHOT.jar app.jar

# Expose the port Spring Boot uses
EXPOSE 8080

# 5. The "Magic" Entrypoint
# -XX:+UseContainerSupport: Makes Java respect Docker RAM limits
# -Xmx400m: Prevents Java from using more than 400MB (vital for 512MB free tiers)
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-Xmx400m", "-Xms400m", "-jar", "app.jar"]