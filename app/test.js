import fetch from 'node-fetch';
const response = await fetch('https://skyeng.autofaq.ai/api/operators/statistic/currentState', {
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiZDY1MGY5ZDktNTUxZC00OGMwLTkxNGItM2RlNzM3YTA0MWFhIiwibG9naW4iOiJyLmcuZ3VzZXlub3ZAc2t5ZW5nLnJ1IiwiZnVsbE5hbWUiOiIwS0xRbnkzUWs5R0QwWUhRdGRDNTBMM1F2dEN5SU5DZzBMRFJoZEM0MExRPSIsImlzQWN0aXZlIjp0cnVlLCJpc05vdGlmeSI6ZmFsc2UsInNlcnZpY2VJZCI6IjM2MWM2ODFiLTM0MGEtNGU0Ny05MzQyLWM3MzA5ZTI3ZTdiNSIsImFjdGlvbnMiOlsiUmVhc29uOE9wZXJhdG9yIiwiUmVhc29uOE9wZXJhdG9yVmlld0FsbEtCIiwiU3VwZXJ2aXNvciJdLCJlbWFpbCI6InIuZy5ndXNleW5vdkBza3llbmcucnUiLCJzZXR0aW5ncyI6eyJrbm93bGVkZ2VCYXNlcyI6WzEyMDE4MV0sImF1dG9Bc3NpZ25FbmFibGVkIjp0cnVlfX0sImV4cCI6MjkyODc3OTg3Nn0.mASzSg3HOQRyr-brrT4-Wu39vYbtd2syyam1sPqjBsw',
        },
    })
    .then(response => response.json())
    .then(json => { return json })
console.log(response)