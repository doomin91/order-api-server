import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "WashSwat 상품관리 API",
      description:
        "Description : WashSwat 상품관리 API",
    },
    servers: [
      {
        url: "http://localhost:5000", // 요청 URL
      },
    ],
  },
  apis: ["./api/*.js", "./api/user/*.js", "./api/order/*.js"], //Swagger 파일 연동
}
const specs = swaggerJsdoc(options)

export { swaggerUi, specs }