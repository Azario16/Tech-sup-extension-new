import fetch from 'node-fetch';
async function getCurrentState() {
    const response = await fetch('https://skyeng.autofaq.ai/api/operators/statistic/currentState', {
        headers: {
            authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiZDY1MGY5ZDktNTUxZC00OGMwLTkxNGItM2RlNzM3YTA0MWFhIiwibG9naW4iOiJyLmcuZ3VzZXlub3ZAc2t5ZW5nLnJ1IiwiZnVsbE5hbWUiOiIwS0xRbnkzUWs5R0QwWUhRdGRDNTBMM1F2dEN5SU5DZzBMRFJoZEM0MExRPSIsImlzQWN0aXZlIjp0cnVlLCJpc05vdGlmeSI6ZmFsc2UsInNlcnZpY2VJZCI6IjM2MWM2ODFiLTM0MGEtNGU0Ny05MzQyLWM3MzA5ZTI3ZTdiNSIsImFjdGlvbnMiOlsiUmVhc29uOE9wZXJhdG9yIiwiUmVhc29uOE9wZXJhdG9yVmlld0FsbEtCIiwiU3VwZXJ2aXNvciJdLCJlbWFpbCI6InIuZy5ndXNleW5vdkBza3llbmcucnUiLCJzZXR0aW5ncyI6eyJrbm93bGVkZ2VCYXNlcyI6WzEyMDE4MV0sImF1dG9Bc3NpZ25FbmFibGVkIjp0cnVlfX0sImV4cCI6MjkyODc3OTg3Nn0.mASzSg3HOQRyr-brrT4-Wu39vYbtd2syyam1sPqjBsw',
        },
    })
        .then(response => response.json())
        .then(json => { return json })
    return response.rows;
}
//console.log(operStats);
const operStats = await getCurrentState();

const ArrPeople = {
    oper: {},
    groupCnt: ''
}
ArrPeople['oper'] = await getAfFunction('ТП');
//console.log(ArrPeople);

function getAfFunction(groupIdAf) {
    // Сброс нумераций операторов
    const online = parse('Online', groupIdAf);
    const busy = parse('Busy', groupIdAf);
    const pause = parse('Pause', groupIdAf);

    const parseResult = {
        Online: online,
        Busy: busy,
        Pause: pause
    }
    return parseResult;
}

function parse(status, groupIdParse) {
    const userList = []
    let userInfo = {};
    // статус операторов на английском, решил в массиве сразу интерпретировать а не в момент когда буду делать строку для отправки
    const statusArr = {
        Online: 'Онлайн',
        Busy: 'Занят',
        Pause: 'Перерыв',
    };
    operStats.forEach((person, index) => {
        // AF вместо 0 чатов отдает null, тут условие чтобы были нули
        if (person.operator !== null) {
            if (person.operator.status === status && person.operator.fullName.split('-')[0] == groupIdParse) {
                if (person.aCnt === null) {
                    operStats[index].aCnt = 0;
                }
                if (person.cCnt === null) {
                    operStats[index].cCnt = 0;
                }
                // нумерация операторов
                const name = person.operator.fullName.padEnd(30);
                //const stats = statusArr[status].padEnd(20);
                userInfo = {
                    name: person.operator.fullName,
                    stats: status,
                    aCnt: operStats[index].aCnt,
                    cCnt: operStats[index].cCnt,
                    sCnt: operStats[index].aCnt + operStats[index].cCnt,
                }
                userList.push(userInfo);
            }
        }
    });
    return userList;
}

console.log(ArrPeople);
const cCntUndistributedTechSupport = checkSumContTematicGroup([120181]);
ArrPeople['groupCnt'] = String(cCntUndistributedTechSupport);

let a = '2';

function checkSumContTematicGroup(grourpKb) {
    const listCntUndistributed = [];
    operStats.forEach((operatorState) => {
        if (operatorState.operator === null) {
            if (grourpKb.includes(operatorState.kb)) {
                listCntUndistributed.push(operatorState.cCnt)
            }
        }
    });
    const summCnt = listCntUndistributed.reduce((sum, current) => sum + current, 0);
    return summCnt;
}