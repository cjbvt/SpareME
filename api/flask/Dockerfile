FROM continuumio/miniconda3:4.4.10

RUN apt-get update && \
    apt-get install -y netcat

RUN conda update -n base conda && \
    conda config --add channels conda-forge && \
    conda create -y -n flask \
        python=3 \
        scikit-learn \
        flask=0.12 \
        flask-restful

# alternative to `source activate flask`
ENV PATH /opt/conda/envs/flask/bin:$PATH

# can't figure out how to install this into the conda environment
RUN pip install firebase-admin

# Create a flask user to avoid running flask as root
RUN useradd -r flask
COPY . /app
WORKDIR /app
RUN chown -R flask /app
USER flask

HEALTHCHECK --interval=12s --timeout=12s --start-period=30s \
 CMD nc -z localhost 5000

ENV FLASK_APP="app.py"

CMD ["flask", "run", "--host=0.0.0.0"]