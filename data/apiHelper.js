import fetch from "node-fetch";
import {BASE_URL} from '../server'
import DataLoader from "dataloader/index";


export function getDataByUrl(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`)
        .then(res => res.json())
        .then(json => json)
}

export const loaders = {
    data: new DataLoader(
        keys => Promise.all(keys.map(getDataByUrl))
    )
}

const extendingId = url => {
    return parseInt(url.split('/')[5], 10);
}

function objectWithId(obj) {
    obj.id = parseInt(obj.url.split('/')[5], 10);
    return obj;
}

export const getObject = (root, loaders, url, args, id = true) =>
    id === true ? loaders.data.load(`/${url}/${args.filmID || args.personID || args.planetID }`)
        : loaders.data.load(`${url}${extendingId(args)}`)


function sortObjectsById(array) {
    return array.sort((a, b) => a.id - b.id);
}

async function fetchFromUrl(url) {
    const fetched = await fetch(url);
    const json = await fetched.text();
    return JSON.parse(json);
}

const localUrlLoader = new DataLoader(urls =>
    Promise.all(urls.map(fetchFromUrl)),
);

export async function getObjectFromUrl(url) {
    const data = await localUrlLoader.load(url);
    return objectWithId(data);
}


export async function getObjectsFromUrls(urls) {
    const array = await Promise.all(urls.map(getObjectFromUrl));
    return sortObjectsById(array);
}


export async function getObjectsByType(type) {
    let objects = [];
    let nextUrl = `https://swapi.co/api/${type}/`;
    while (nextUrl) {
        const pageData = await localUrlLoader.load(nextUrl);
        objects = objects.concat(pageData.results.map(objectWithId));
        nextUrl = pageData.next;
    }
    objects = sortObjectsById(objects);
    return {objects};
}