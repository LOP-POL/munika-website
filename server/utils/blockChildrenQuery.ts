import { Client } from "@notionhq/client"

const storage = useStorage()

const metaBlockChildren = storage.getItem('kamunBlockChildren')
let results:any = []

export async function queryChild(notion:Client,databaseName:string,extractFn:()=> any,filter:() => any){
   await metaBlockChildren.
   then(async (data:any)=>{
    const childDbBlock:any = data.results.find((b:any) => b.type === 'child_database' && b.child_database && b.child_database.title==databaseName )

        if (childDbBlock) {
            const DbId = childDbBlock.id.replace(/-/g, '')
           

            try {
                const dbInfo = await notion.databases.query({ database_id: DbId, page_size: 100 })
                if(filter){
                    results = dbInfo.results.map(extractFn).filter(filter)
                    return results
                }
                else{
                    results = dbInfo.results.map(extractFn)
                    return results
                }

            }
            catch(err){
                console.log(err)
                results = []
                return results
            }
        }
        
   })
   
}


