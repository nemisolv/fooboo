import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostsTab from "./PostsTab"

export default function ProfileTabs() {
    return <Tabs defaultValue="post" className="mt-6">
    <TabsList>
      <TabsTrigger  value="post" className='px-6 py-4 hover:bg-gray-200 font-medium text-slate-500 ' >Posts</TabsTrigger>
      <TabsTrigger value="password" className='px-6 py-4 hover:bg-gray-200 font-medium text-slate-500 ' >About</TabsTrigger>
      {/* <TabsTrigger value="password" className='px-4 py-2 hover:bg-gray-200 font-medium text-slate-500 ' >Friends</TabsTrigger>
      <TabsTrigger value="password" className='px-4 py-2 hover:bg-gray-200 font-medium text-slate-500 ' >About</TabsTrigger> */}
    </TabsList>
    <TabsContent value="post">
    <PostsTab/>
    </TabsContent>
    <TabsContent value="password">Change your password here.</TabsContent>
  </Tabs>
  
}