describe('End-To-End Quiz Test', () => {
    beforeEach(() => {
        cy.visit('127.0.0.1:3001/');
    });


    it('should display the Start Quiz button', () => {

        cy.get('button').contains("Start Quiz").should('be.visible');
    });


    it('should answer all questions and display the final score at the end', () => {
        
        cy.contains('Start Quiz').click();

        function answerQuiz() {

            for (let x = 0; x < 10; x++) {
                cy.get('.card h2').should('be.visible');

                cy.get('.d-flex').should('have.length', 4);

                cy.get('.d-flex button').first().click();
            }

            cy.get('.alert-success').then(($score) => {
                if ($score.length) {
                    cy.contains('Quiz Completed').should('be.visible');
                    cy.get('.alert-success').contains('Your score: ');

                    cy.wait(5000);

                    cy.contains('Take New Quiz').click();
                } else {
                    answerQuiz();
                }
            });

        }

        answerQuiz();
    });
});