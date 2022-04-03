# Speeches
_As An admin (for now), I can use the speeches api to CRUD speeches and speech analytics._  

# Model
- Speeches
  - extends Crud
  - includes...`runAnalytics` method or something
    - do all the work here during speech creation
    - maybe each analysis is a unique function? maybe here is where the functions get "bound" to this `class`?
  - Create
    - author
    - date
    - text
    - analysis
      - all the deets here?!