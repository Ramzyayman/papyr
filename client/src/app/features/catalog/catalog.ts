import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../shared/models/book';


interface FilterOption {
  name: string;
  selected: boolean;
}


type SortOption =
  | 'title-asc'
  | 'title-desc'
  | 'rating-desc'
  | 'rating-asc';



@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {



  constructor(
    private bookService: BookService
  ) {}



  // ========================================
  // Load books
  // ========================================

  ngOnInit(): void {

    this.books = this.bookService.getBooks();

  }



  // ========================================
  // Search
  // ========================================

  searchTerm = '';



  // ========================================
  // Sorting
  // ========================================

  sortBy: SortOption = 'title-asc';



  // ========================================
  // Pagination
  // ========================================

  currentPage = 1;

  readonly booksPerPage = 12;



  // ========================================
  // Genre filters
  // ========================================

  genres: FilterOption[] = [

    {
      name: 'Literary Fiction',
      selected: false
    },

    {
      name: 'Historical & Period',
      selected: false
    },

    {
      name: 'Philosophy & Essays',
      selected: false
    },

    {
      name: 'Poetry Collections',
      selected: false
    }

  ];



  // ========================================
  // Era filters
  // ========================================

  eras: FilterOption[] = [

    {
      name: 'Contemporary',
      selected: false
    },

    {
      name: 'Modernist (1890–1945)',
      selected: false
    },

    {
      name: 'Classic Antiquity',
      selected: false
    }

  ];



  // ========================================
  // Shared books
  // ========================================

  books: Book[] = [];



  // ========================================
  // Filtered books
  // ========================================

  get filteredBooks(): Book[] {


    const selectedGenres = this.genres
      .filter(genre => genre.selected)
      .map(genre => genre.name);



    const selectedEras = this.eras
      .filter(era => era.selected)
      .map(era => era.name);



    const search = this.searchTerm
      .trim()
      .toLowerCase();



    let result = this.books.filter(book => {


      const matchesSearch =
        !search ||
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search);



      const matchesGenre =
        selectedGenres.length === 0 ||
        selectedGenres.includes(book.genre);



      const matchesEra =
        selectedEras.length === 0 ||
        selectedEras.includes(book.era);



      return (
        matchesSearch &&
        matchesGenre &&
        matchesEra
      );


    });



    result = [...result].sort((a, b) => {


      switch (this.sortBy) {


        case 'title-desc':

          return b.title.localeCompare(a.title);



        case 'rating-desc':

          return b.rating - a.rating;



        case 'rating-asc':

          return a.rating - b.rating;



        case 'title-asc':

        default:

          return a.title.localeCompare(b.title);

      }


    });



    return result;

  }





  // ========================================
  // Pagination
  // ========================================

  get totalPages(): number {

    return Math.ceil(
      this.filteredBooks.length / this.booksPerPage
    );

  }




  get paginatedBooks(): Book[] {


    const startIndex =
      (this.currentPage - 1) * this.booksPerPage;



    const endIndex =
      startIndex + this.booksPerPage;



    return this.filteredBooks.slice(
      startIndex,
      endIndex
    );


  }




  get pages(): number[] {

    return Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );

  }





  // ========================================
  // Filters
  // ========================================

  get activeFilters(): string[] {

    return [

      ...this.genres
        .filter(genre => genre.selected)
        .map(genre => genre.name),


      ...this.eras
        .filter(era => era.selected)
        .map(era => era.name)

    ];

  }




  get hasActiveFilters(): boolean {

    return (
      this.activeFilters.length > 0 ||
      this.searchTerm.trim().length > 0
    );

  }





  onSearch(event: Event): void {


    const input =
      event.target as HTMLInputElement;


    this.searchTerm = input.value;


    this.resetPagination();

  }





  onGenreChange(genre: FilterOption): void {


    genre.selected = !genre.selected;


    this.resetPagination();

  }





  onEraChange(era: FilterOption): void {


    era.selected = !era.selected;


    this.resetPagination();

  }





  onSortChange(event: Event): void {


    const select =
      event.target as HTMLSelectElement;


    this.sortBy =
      select.value as SortOption;


    this.resetPagination();

  }





  removeFilter(filterName: string): void {


    const genre =
      this.genres.find(
        item => item.name === filterName
      );


    if (genre) {

      genre.selected = false;

    }



    const era =
      this.eras.find(
        item => item.name === filterName
      );


    if (era) {

      era.selected = false;

    }



    this.resetPagination();

  }





  clearFilters(): void {


    this.searchTerm = '';



    this.genres.forEach(
      genre => genre.selected = false
    );



    this.eras.forEach(
      era => era.selected = false
    );



    this.resetPagination();

  }





  goToPage(page: number): void {


    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }



    this.currentPage = page;



    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }





  previousPage(): void {

    this.goToPage(this.currentPage - 1);

  }





  nextPage(): void {

    this.goToPage(this.currentPage + 1);

  }





  resetPagination(): void {

    this.currentPage = 1;

  }



}