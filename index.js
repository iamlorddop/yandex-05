const fs = require('fs')
const jsondb = require('./input.json')
const jsonData = jsondb.data

console.log(jsonData[0].children.length)

module.exports = async function renderAsync(renderItems, n) {
    // В этот массив будем вносить id
    renderItems = []

    // Перебираем объект
    for(let i = 0; i < jsonData.length; i++) {
        if(jsonData[i].priority > jsonData[jsonData.length - 1].priority
            || jsonData[i].priority === jsonData[jsonData.length - 1].priority) {
            renderItems.push(jsonData[i].id)
        }

        if(jsonData[i].priority < jsonData[jsonData.length - 1].priority
            || jsonData[i].priority < jsonData[i - 1].priority) {
            renderItems.push(jsonData[i].id)
        }

        for(let j = 0; j < jsonData[i].children.length; j++) {
            if(jsonData[i].children[j].priority > jsonData[i].children[jsonData[i].children.length - 1].priority
                || jsonData[i].children[j].priority === jsonData[i].children[jsonData[i].children.length - 1].priority) {
                renderItems.push(jsonData[i].children[j].id)
            }

            if (jsonData[i].children[j].children) {
                for(let k = 0; k < jsonData[i].children[j].children.length; k++) {
                    if(jsonData[i].children[j].children[k].priority > jsonData[i].children[j].children[jsonData[i].children[j].children.length - 1].priority
                        || jsonData[i].children[j].children[k].priority === jsonData[i].children[j].children[jsonData[i].children[j].children.length - 1].priority) {
                        renderItems.push(jsonData[i].children[j].children[k].id)
                    }
                }
            }
        }
    }

    // Возращаем пустой массив, если никаких объектов в json нет
    if(jsonData.length === 0) {
        return []
    }

    // создаем файл и записываем туда id
    await fs.writeFileSync('output.json', JSON.stringify([...renderItems]))
}