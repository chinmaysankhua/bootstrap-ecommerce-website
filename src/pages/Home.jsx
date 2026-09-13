import { Container, Button } from 'react-bootstrap'

const tourDates = [
  {
    date: 'JUL 16',
    location: 'DETROIT, MI',
    venue: 'DTE ENERGY MUSIC THEATRE',
  },
  {
    date: 'JUL 19',
    location: 'TORONTO, ON',
    venue: 'BUDWEISER STAGE',
  },
  {
    date: 'JUL 22',
    location: 'BRISTOW, VA',
    venue: 'JIGGY LUBE LIVE',
  },
  {
    date: 'JUL 29',
    location: 'PHOENIX, AZ',
    venue: 'AK-CHIN PAVILION',
  },
  {
    date: 'AUG 2',
    location: 'LAS VEGAS, NV',
    venue: 'T-MOBILE ARENA',
  },
  {
    date: 'AUG 7',
    location: 'CONCORD, CA',
    venue: 'CONCORD PAVILION',
  },
]

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="home-hero">
        <h1>The Generics</h1>

        <Button
          variant="outline-info"
          className="latest-album-btn"
        >
          Get our Latest Album
        </Button>

        <button className="play-button">
          ▶
        </button>
      </section>

      {/* TOURS SECTION */}
      <section className="tours-section">
        <Container>
          <h2>TOURS</h2>

          <div className="tour-list">
            {tourDates.map((tour) => (
              <div
                className="tour-row"
                key={`${tour.date}-${tour.location}`}
              >
                <span className="tour-date">
                  {tour.date}
                </span>

                <span className="tour-location">
                  {tour.location}
                </span>

                <span className="tour-venue">
                  {tour.venue}
                </span>

                <Button variant="info">
                  BUY TICKETS
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      
    </>
  )
}

export default Home