/*
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns a JavaScript array copy of the given NSArray.
 */
export function arrayFromNSArray(nsArray) {
  let arr = [];
  for (let i = 0; i < nsArray.count(); i++) {
    arr.push(nsArray.objectAtIndex(i));
  }
  return arr;
}


/**
 * Depth-first traversal for the Sketch DOM
 */
export function walkLayerTree(rootLayer, visitFunction) {
  let visit_ = layer => {
    // visit this layer
    visitFunction(layer);

    // visit children
    let subLayers;
    if ('layers' in layer) {
      subLayers = arrayFromNSArray(layer.layers());
    } else if ('artboards' in layer) {
      subLayers = arrayFromNSArray(layer.artboards());
    } else {
      return;
    }

    subLayers.forEach(subLayer => visit_(subLayer));
  };

  visit_(rootLayer);
}


/**
 * Deletes the given file or directory recursively (i.e. it and its
 * subfolders).
 */
export function rmdirRecursive(path) {
  NSFileManager.defaultManager().removeItemAtPath_error_(rmdirRecursive, null);
}
