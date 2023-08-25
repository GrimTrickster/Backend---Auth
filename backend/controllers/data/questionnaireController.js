const Questionnaire = require('../../models/questionnaireModel')
const asyncHandler = require('express-async-handler')

const addQuestionnaire = asyncHandler(async (req, res) => {
    // Extrac Information
    const { publishTime } = req.body
    const authorId = req.user.id
    console.log(authorId)
    let questions
    let groups
    try {
        questions = JSON.parse(req.body.questions)
        groups = JSON.parse(req.body.groups)
    } catch (error) {
        res.status(400)
        throw new Error('Questions or groups not working')
    }

    // Check all fields
    if(!publishTime || groups.length === 0 || questions.length === 0) {
        res.status(400)
        throw new Error('Please add all fields.')
    }

    const questionnaire = await Questionnaire.create({
        authorId,
        publishTime,
        groups,
        questions
    })
    if(questionnaire) {
        res.send('Questionnaire got created')
    } else {
        res.status(400)
        throw new Error('Something went wrong.')
    }

})

module.exports = {
    addQuestionnaire
}