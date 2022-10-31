# Running App

## Docker

To run the application execute below docker command in CMD (docker should be installed in the machine)

 `docker compose up` 

## Local

Checkout the code and run the below commands in the root folder to start the application in local.

`mvn clean install -DskipTests=true`

`java -jar ./target/verma-payment-calculator-0.0.1-SNAPSHOT.jar`


# Accessing Application:
After application started use below URL to launch the app.

[http://localhost:8080/index.html](http://localhost:8080/index.html)



# Formulae

EMI amount calculation formula:

`EMI = P x R x (1+R)^N / [(1+R)^N-1]`

Loan tenure calculation formula:

`N=log[(EMI/R)/((EMI/R)−P)]/log(1+R)`

EMI: Monthly payment
P: Principal loan amount
N: Loan tenure in months
R: Monthly interest rate (annual rate divided by 100 divided by 12)


## Sample Json Request

Sample whole request, accepts either repayment or tenureInMonths so remove one before using it in API request body
`{
	"principle": 5000,
	"interest": 6,
	"repayment":2000,
	"tenureInMonths":4
}`
