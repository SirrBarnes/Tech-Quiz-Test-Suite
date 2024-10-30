import Quiz from '../../client/src/components/Quiz';
import { mount } from 'cypress/react18';

describe('Quiz Component Test', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', {
            fixture: 'questions.json'
        }).as('getQuestions');
        mount(<Quiz />);
    })

    it('should start the quiz and display the first question with 4 possible answers', () => {
        cy.contains('Start Quiz').click();

        cy.wait('@getQuestions');

        cy.get('.card h2').should('not.be.empty');

        cy.get('.d-flex').should('have.length', 4);
    });

    it('should increase the player score by one when the correct answer is selected, go through the entire quiz and show th total score', () => {
        cy.contains('Start Quiz').click();

        cy.wait('@getQuestions');

        cy.fixture('questions.json').then((questionsData) => {
            questionsData.forEach((question, questionIndex) => {
              // Click the correct answer based on `isCorrect`
              cy.get('.btn').each((button, answerIndex) => {
                if (question.answers[answerIndex].isCorrect) {
                  cy.wrap(button).click();
                }
              });

            if (questionIndex < questionsData.length - 1) {
                cy.get('.card h2').should('not.contain', question.question);
            }
        });

            cy.contains('Quiz Completed').should('be.visible');
            cy.get('.alert-success').contains('Your score: ').should('be.visible');

            cy.wait(5000);
            cy.contains('Take New Quiz').click();
        });
    });
});