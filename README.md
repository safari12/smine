# smine

## Description
Smine is a bot that automates maintence of mining rigs by sending email notifications.

## Why Use This
Not every mining pool supports email notifications, and even if they do, who knows if its reliable and informative.

## Warning
Only supports xmr-stak rigs so far. It gets miner data by hitting its API. In the future, the bot will support more miner protocols / softwares

## How It Works
Bot takes a config file and monitors rigs every minute.
If the bot detects a rig that becomes offline or online it will send a notification to the user. The notification will contain the rigs that became online or offline, and give you the total current hashrate of all rigs and the total hashrate lossed from offline rigs.

## Setup

### Email Notifications
You must register an email account with a known SMTP provider like gmail and enable less secure apps access. After that put the email credentials to the config json file just like the following

```json
{
  "email": {
    "host": "smtp.gmail.com",
    "port": 587,
    "recipients": [
      "put recipients here"
    ],
    "auth": {
      "user": "put email username here",
      "pass": "put email password here"
    }
  }
}
```

### Rig Discovery
For the bot to discover the rigs automatocally, the rigs must have a hostname with a common prefix and a DNS server to resolve the domain request. For example, if the user specify hostname with prefix of "s-m-" in the discovery section, the bot will request data from s-m-N, where N starts at 01 to the value of "number_of_rigs" in config file. So if "number_of_rigs" is 10 for example, the bot request data from "s-m-01" to "s-m-10" rigs. The API section is the API configuration for the miner protocol. The following is an example of discovery usage in config json file:

```json
{
  "discovery": {
    "number_of_rigs": 5,
    "hostname": {
      "prefix": "s-m-"
    },
    "api": {
      "port": 6969,
      "endpoint": "/api.json",
      "timeout": 5000
    }
  },
}
```

## Config Syntax
Bot takes a config json file with the following

```json
{
  "discovery": {
    "number_of_rigs": 5,
    "hostname": {
      "prefix": "s-m-"
    },
    "api": {
      "port": 6969,
      "endpoint": "/api.json",
      "timeout": 5000
    }
  },
  "email": {
    "host": "smtp.gmail.com",
    "port": 587,
    "recipients": [
      "put recipients here"
    ],
    "auth": {
      "user": "put email username here",
      "pass": "put email password here"
    }
  }
}
```

## Installation

### Global
```bash
// clone repo
git clone https://github.com/safari12/smine.git

// create symlink
npm link

// run app
smine --version
smine --help
smine --config config.json
```

### Local
```bash
// clone repo
git clone https://github.com/safari12/smine.git

// run local
./bin/smine.js --version
./bin/smine.js --config config.json
```

## Docker

```bash
// clone repo
git clone https://github.com/safari12/smine.git

// build image with tag
docker build -t smine

// run container
docker run -it --network host -d -v /apps/smine/:/app/config smine
```

## Docker Compose

Note: by default, Dockerfile looks for config json file the volume path which is in the docker compose file

```bash
// clone repo
git clone https://github.com/safari12/smine.git

// build images
docker-compose build

// run containers in foreground
docker-compose up

// run containers in background
docker-compose up -d
```
