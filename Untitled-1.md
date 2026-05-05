curl -s -X POST https://ingest.elliottsencan.com/consume -H "Authorization: Bearer 3f9a2b8e1c4d5f6a7b8c9d0e1f2a3b4c" -H "Content-Type: application/json" -d '{"branch":"now-update/2026-04-17"}'  


Two placeholders: $BEARER and $WORKER (e.g. https://site-ingest.<account>.workers.dev).
                                                     
  export BEARER='3f9a2b8e1c4d5f6a7b8c9d0e1f2a3b4c'
  export WORKER='https://ingest.elliottsencan.com'
                                                                                                                                                                            
  1. /synthesize dry-run                                                                                                                                                    
                                                                                                                                                                            
  curl -sS -X POST "$WORKER/synthesize" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d '{}' | jq                                                 
                                                                                                                                                                            
  2. /synthesize live                 
                                                                                                                                                                            
  curl -sS -X POST "$WORKER/synthesize" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d '{"dry_run": false}' | jq
                                                                                                                                                                            
  3. /recompile a single reading entry by slug                                                                                                                              
                                                                                                                                                                            
  curl -sS -X POST "$WORKER/recompile" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d                                                            
  '{"scope":{"kind":"slugs","slugs":["2026-04/2026-04-23T150424-your-agent-loves-mcp-as-much-as-you-love-guis"]},"dry_run":false}' | jq                                     
                                      
  4. /recompile since date (dry-run preview)                                                                                                                                
                                                                                                                  
  curl -sS -X POST "$WORKER/recompile" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d                                                            
  '{"scope":{"kind":"since","since":"2026-04-01"},"dry_run":true}' | jq                                                                                                     
                                      
  Other scopes: {"kind":"all"} and {"kind":"compiled_before_model","model":"<model-id>"}. Flip dry_run to false to actually open a PR.                                      
                                                                                                                  
  5. /crosslink for a single wiki page                                                                                                                                      
                                                                                                                  
  curl -sS -X POST "$WORKER/crosslink" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d                                                            
  '{"scope":{"kind":"slug","corpus":"wiki","slug":"responsive-design"},"dry_run":false}' | jq                                                                               
                                      
  For a writing post, swap corpus to "blog".                                                                                                                                
                                                                                                                  
  6. /crosslink since date (dry-run preview)                                                                                                                                
                                                                                                                  
  curl -sS -X POST "$WORKER/crosslink" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d
  '{"scope":{"kind":"since","since":"2026-04-01"},"dry_run":true}' | jq                                                                                                     
   
  7. /contribute (manually authored wiki article)                                                                                                                           
                                                                                                                  
  Inline JSON gets ugly with multi-paragraph bodies; easiest is to put the payload in a file and -d @body.json:                                                             
                                                                                                                  
  curl -sS -X POST "$WORKER/contribute" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d @contribute.json | jq                                     
                                                                                                                                                                            
  contribute.json:                    
                                                                                                                                                                            
  {"topic":"css-primitives","title":"CSS primitives","summary":"One-sentence concept summary, ≤240 chars.","body":"First paragraph.\n\nSecond paragraph. Plain markdown — no
   frontmatter.","sources":["slug-a","slug-b"],"dry_run":false}                                                                                                             
   
  sources needs ≥2 reading-entry slugs. Add "force": true to overwrite an existing article.                                                                                 
                                                                                                                  
  Get just the PR URL on success                                                                                                                                            
                                                                                                                  
  curl -sS -X POST "$WORKER/synthesize" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d '{"dry_run": false}' | jq -r '.pr.url // .path // empty'  
                                                                                                                                                                            
  Pipe to open (macOS) / xdg-open (Linux) to jump straight to the PR.                            

  curl -sS -i -X POST "$WORKER/synthesize" -H "Authorization: Bearer $BEARER" -H "Content-Type: application/json" -d '{"force": true, "dry_run": false}'