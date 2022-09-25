import swaggerUi from "swagger-ui-express"
import swaggerJsdoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "의류상품 관리 API 모듈",
      description:
        "Description : 의류상품 관리 API 모듈",
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