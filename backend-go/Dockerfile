# Start from a base image with Go installed
FROM golang:1.21-alpine

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source from the current directory to the Working Directory inside the container
COPY . .

# Build the Go app
RUN go build -o main ./cmd/dartcounterapi/

# Expose port to the outside world
EXPOSE 8080

# Command to run the executable
CMD ["./main"]
