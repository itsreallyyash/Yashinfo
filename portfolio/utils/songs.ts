export const songs = [
  {
    title: "White Ferrari",
    artist: "Frank Ocean",
    url: "/audio/wf.mp3"
  },
  {
    title: "Pacific Parc",
    artist: "Fona",
    url: "/audio/pp.mp3"
  },
  {
    title: "While My Guitar Gently Weeps",
    artist: "The Beatles",
    url: "/audio/wm.mp3"
  },
  {
    title: "Moon River",
    artist: "Frank Ocean",
    url: "/audio/mr.mp3"
  },
  {
    title: "Broken Road",
    artist: "Kanye West",
    url: "/audio/br.mp3"
  }
];

export function getRandomSong() {
  return songs[Math.floor(Math.random() * songs.length)];
}
