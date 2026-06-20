FROM node:20-alpine

WORKDIR /app

COPY ./package.json ./package.json
copy ./package-lock.json ./package-lock.json

RUN npm install

COPY . .

ENV DATABASE_URL=postgresql://postgres:mysecretepassword@localhost:5432/postgres

RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN npx prisma migrate dev
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]