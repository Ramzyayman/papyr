# 📚 Papyr

<p align="center">
  <strong>A digital reading platform for discovering, exploring, and saving books.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white" alt="Angular">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/RxJS-B7178C?logo=reactivex&logoColor=white" alt="RxJS">
  <img src="https://img.shields.io/badge/Open%20Library-API-025E8C" alt="Open Library API">
  <img src="https://img.shields.io/badge/Status-Complete-2EA44F" alt="Status: Complete">
</p>

## 📖 About

Papyr is a digital reading platform built with Angular. It allows users to browse books, search and filter the catalog, view detailed book information, save books to a personal library, and leave reviews.

Book information is provided through the Open Library API, while library and review data are persisted locally using the browser's `localStorage`.

## Features

- 📚 Browse a catalog of books
- 🔎 Search books by title or author
- 🏷️ Filter books by genre and era
- ↕️ Sort books by title or rating
- 📄 Paginated catalog results
- 📖 View detailed book information
- 👤 View author information
- 🏢 View publisher and publication information
- 📑 View page counts and ISBNs
- 🔖 Add books to a personal library
- 💾 Persist library data using `localStorage`
- ⭐ Rate books
- 💬 Add and persist reviews
- 🖼️ Display book covers from Open Library
- 📱 Responsive user interface

## 🛠️ Technologies

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic and type safety |
| HTML | Application structure |
| CSS | Styling and responsive layout |
| RxJS | Asynchronous API handling |
| Open Library API | Book data |
| localStorage | Library and review persistence |
| Bootstrap Icons | Interface icons |

## Project Structure

```text
papyr/
├── client/
│   ├── public/
│   │   └── images/
│   │
│   └── src/
│       └── app/
│           ├── features/
│           │   ├── catalog/
│           │   ├── book/
│           │   └── library/
│           │
│           ├── services/
│           │   ├── book.service.ts
│           │   ├── library.service.ts
│           │   └── review.service.ts
│           │
│           └── shared/
│               ├── data/
│               └── models/
│
└── README.md
