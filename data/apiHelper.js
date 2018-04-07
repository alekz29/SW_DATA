import fetch from "node-fetch";
import {BASE_URL} from '../server'
import DataLoader from "dataloader/index";


const localUrlLoader = new DataLoader(urls =>
    Promise.all(urls.map(fetchFromUrl)),
);


export async function getObjectFromUrl(url) {
    return await localUrlLoader.load(url);
}


function objectWithId(obj) {
    obj.id = parseInt(obj.url.split('/')[5], 10);
    return obj;
}


export async function getObjectFromTypeAndId(type, id) {
    return await getObjectFromUrl(`${BASE_URL}/${type}/${id}/`);
}

function sortObjectsById(array) {
    return array.sort((a, b) => a.id - b.id);
}

async function fetchFromUrl(url) {
    const fetched = await fetch(url);
    const json = await fetched.text();
    return JSON.parse(json);
}


export async function getObjectsFromUrls(urls) {
    const array = await Promise.all(urls.map(getObjectFromUrl));
    return sortObjectsById(array);
}


export async function getObjectsByType(type) {
    let objects = [];
    let nextUrl = `${BASE_URL}/${type}/`;
    while (nextUrl) {
        const pageData = await localUrlLoader.load(nextUrl);
        objects = objects.concat(pageData.results.map(objectWithId));
        nextUrl = pageData.next;
    }
    objects = sortObjectsById(objects);
    return {objects, totalCount: objects.length};
}