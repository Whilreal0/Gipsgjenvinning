import React from 'react';

const LATITUDE = 59.18641419350037;
const LONGITUDE = 10.966939599999998;
const ZOOM = 16;
const BBOX_DELTA = 0.01;

const bbox = [
    (LONGITUDE - BBOX_DELTA).toFixed(6),
    (LATITUDE - BBOX_DELTA).toFixed(6),
    (LONGITUDE + BBOX_DELTA).toFixed(6),
    (LATITUDE + BBOX_DELTA).toFixed(6),
].join('%2C');

const OSM_EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${LATITUDE}%2C${LONGITUDE}&zoom=${ZOOM}`;
const OSM_VIEW_URL = `https://www.openstreetmap.org/?mlat=${LATITUDE}&mlon=${LONGITUDE}#map=${ZOOM}/${LATITUDE}/${LONGITUDE}`;

const Map: React.FC = () => (
    <div className="space-y-4">
        <div className="relative h-96 w-full overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <iframe
                title="Kart som viser plasseringen til Gipsgjenvinning AS"
                src={OSM_EMBED_URL}
                className="h-full w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            />
        </div>
        <a
            href={OSM_VIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-accent hover:underline"
        >
            Se større kart hos OpenStreetMap
        </a>
    </div>
);

export default Map;
