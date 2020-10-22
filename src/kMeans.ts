import { IArgb } from 'nativescript-bitmap-factory';

class Cluster {
  public center: IArgb;
  public colors: IArgb[];

  constructor(center: IArgb, colors = [center]) {
    this.center = center;
    this.colors = colors;
  }
}

function averageColor(clrs: IArgb[]): IArgb {
  let len = clrs.length;
  return clrs.reduce((accu, clr) => ({
    a: accu.a + clr.a / len,
    r: accu.r + clr.r / len,
    g: accu.g + clr.g / len,
    b: accu.b + clr.b / len
  }), {a: 0, r: 0, g: 0, b: 0})
}

function distEuclid(clr1: IArgb, clr2: IArgb): number {
  return Math.sqrt(
    (clr1.a - clr2.a) * (clr1.a - clr2.a) + 
    (clr1.r - clr2.r) * (clr1.r - clr2.r) + 
    (clr1.g - clr2.g) * (clr1.g - clr2.g) + 
    (clr1.b - clr2.b) * (clr1.b - clr2.b)
  );
}

function assignColorsToClusters(clrs: IArgb[], clusters: Cluster[]) {
  for (const cluster of clusters) {
    cluster.colors = [];
  }
  for (const clr of clrs) {
    let minDist = Number.MAX_VALUE;
    let containingCluster: Cluster = clusters[0];
    for (const cluster of clusters) {
      let d = distEuclid(cluster.center, clr);
      if (d < minDist) {
        minDist = d;
        containingCluster = cluster;
      }
    }
    containingCluster.colors.push(clr);
  }
}

/**
 * Implementation of the k means algorithm for extracting color-groupings from an array of colors.
 * Colors can seem imprecise since euclidean distance is used as the cost function. 
 * @param clrs 
 * @param nClusters 
 * @param dMin precision of clustering
 */
export function clusterColors(clrs: IArgb[], nClusters: number, dMin: number = 0.1): IArgb[] {
  let clusters: Cluster[] = [];
  for (let i = 0; i < nClusters; i++) {
    clusters.push(new Cluster(clrs[~~(Math.random() * clrs.length)]));
  }

  while (true) {
    assignColorsToClusters(clrs, clusters);

    let distance = 0; 
    for (const cluster of clusters) {
      if (cluster.colors.length <= 1) continue;
      
      const oldCenter = cluster.center;
      cluster.center = averageColor(cluster.colors);
      distance = Math.max(distance, distEuclid(oldCenter, cluster.center));
    }
    if (distance < dMin) break;
  }
  return clusters.map(c => c.center);
}
