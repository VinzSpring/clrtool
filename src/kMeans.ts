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

function dist(clr1: IArgb, clr2: IArgb): number {
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
      let d = dist(cluster.center, clr);
      if (d < minDist) {
        minDist = d;
        containingCluster = cluster;
      }
    }
    containingCluster.colors.push(clr);
  }
}

export function clusterColors(clrs: IArgb[], nClusters: number): IArgb[] {
  let clusters: Cluster[] = [];
  for (let i = 0; i < nClusters; i++) {
    clusters.push(new Cluster(clrs[~~(Math.random() * clrs.length)]));
  }

  const MIN_DIST = .1;
  while (true) {
    assignColorsToClusters(clrs, clusters);

    let distance = 0; 
    for (const cluster of clusters) {
      if (cluster.colors.length <= 1) continue;
      
      const oldCenter = cluster.center;
      cluster.center = averageColor(cluster.colors);
      distance = Math.max(distance, dist(oldCenter, cluster.center));
    }
    if (distance < MIN_DIST) break;
  }
  return clusters.map(c => c.center);
}
