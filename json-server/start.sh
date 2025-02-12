#!/bin/bash
json-server --watch db.json --port 3001 --middlewares ./cors-middleware.js