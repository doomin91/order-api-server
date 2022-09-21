import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "TEST",
      description:
        "Description : TEST",
    },
    servers: [
      {
        url: "http://localhost:5000", // 요청 URL
      },
    ],
  },
  apis: [`./src/routes/user.js`, './src/api/**/*.yaml'], //Swagger 파일 연동
}
const specs = swaggerJsdoc(options)

export { swaggerUi, specs }