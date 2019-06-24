% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/raster-tiles.R
\name{add_raster_tile_layer}
\alias{add_raster_tile_layer}
\title{Add a raster tile layer to the deckgl widget
EXPERIMENTAL, see \url{https://deck.gl/#/examples/core-layers/tile-layer}}
\usage{
add_raster_tile_layer(deckgl, id = "raster-tiles",
  tileServer = "https://c.tile.openstreetmap.org/",
  properties = list(), ...)
}
\arguments{
\item{deckgl}{deckgl widget}

\item{id}{id of the layer}

\item{tileServer}{base url of the tile server}

\item{properties}{named list of properties with names corresponding to the properties defined
in the \href{https://deck.gl/#/documentation/deckgl-api-reference}{deckgl-api-reference}
for the given layer class, additionally there is a \code{getTooltip} property (callback)
showing a tooltip when the mouse enters an object,
e. g. \code{getTooltip = JS("object => object.name")}}

\item{...}{more properties (will be added to the properties object), useful if you
want to use a properties object for more than one layer}
}
\description{
Add a raster tile layer to the deckgl widget
EXPERIMENTAL, see \url{https://deck.gl/#/examples/core-layers/tile-layer}
}
\examples{
## @knitr raster-tile-layer
tile_servers <- list(
  osm = "https://a.tile.openstreetmap.org/",
  carto_light = "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/",
  carto_dark = "https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/",
  stamen_toner = "http://a.tile.stamen.com/toner/"
)

deck <- deckgl() \%>\%
  add_raster_tile_layer(
    tileServer = tile_servers$osm,
    pickable = TRUE,
    autoHighlight = TRUE,
    highlightColor = c(60, 60, 60, 40)
  )

if (interactive()) deck
}