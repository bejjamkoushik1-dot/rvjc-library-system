// Book cover: use cover_url from DB, else Open Library by ISBN (real book covers)
function getCoverUrl(book) {
  if (book.cover_url) return book.cover_url;
  if (book.isbn) {
    var isbnDigits = String(book.isbn).replace(/\D/g, '');
    if (isbnDigits.length >= 10) return 'https://covers.openlibrary.org/b/isbn/' + isbnDigits + '-M.jpg';
  }
  return '';
}

// Placeholder for missing cover (data URI SVG)
var PLACEHOLDER_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='280' viewBox='0 0 200 280'%3E%3Crect fill='%231a2332' width='200' height='280'/%3E%3Ctext fill='%238b9eb5' font-family='sans-serif' font-size='14' x='100' y='140' text-anchor='middle' dominant-baseline='middle'%3ENo cover%3C/text%3E%3C/svg%3E";
