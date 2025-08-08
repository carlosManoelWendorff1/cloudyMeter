# Use an official Python runtime as a base image
FROM python:3.9

# Set the working directory inside the container to /app
WORKDIR /app

# Create the /app directory and make it writable

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Expose the port your Flask app will run on
EXPOSE 5000

# Define the command to run your Flask application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:app"]
