# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=16
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN su node -c "umask 0002 && npm install -g http-server"
WORKDIR /app

EXPOSE 5173

# Update keys
RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo gpg --yes --dearmor -o /usr/share/keyrings/yarnkey.gpg
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list > /dev/null

# Install git and bash-completion
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends git bash-completion

# 4340 configuration
RUN git config --system pull.rebase false
