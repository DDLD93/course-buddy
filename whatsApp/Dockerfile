# Use the "focal" (Ubuntu 20.04) base image
FROM ubuntu:20.04

# Set the maintainer label
LABEL maintainer="umar.jere@gmail.com"

# Update the package repository and install any necessary packages
RUN apt-get update && apt-get install -y \
    # Add any packages you need here
    && rm -rf /var/lib/apt/lists/*

# Expose port 3000
EXPOSE 3000

# Add your application files and configure your application as needed
# For example:
# COPY . /app
# WORKDIR /app

# Specify the command to run your application
# CMD ["command-to-start-your-app"]

# Optionally, you can provide an entrypoint script
# ENTRYPOINT ["entrypoint.sh"]
