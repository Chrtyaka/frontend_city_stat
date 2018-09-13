import Diagrams from './components/Diagrams'
export const routes = [
  {path : '/diagrams', name : 'diagram', components : {
      default: Diagrams,
    }},
  {path : '', redirect : '/diagrams'},
  {path : '*', redirect: {name : 'diagram'}}
];
