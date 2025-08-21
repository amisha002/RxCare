// "use client"
// 
// import { useState, ChangeEvent, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Edit2, Save, X, Plus, Trash2, User, Shield, Users, Camera, Mail, Phone, Calendar, Loader2 } from "lucide-react"
// import { useToast } from "@/components/ui/use-toast"
// 
// interface FamilyMember {
//   id: string
//   name: string
//   relation: string
// }
// 
// interface UserProfile {
//   email: string
//   name: string
//   age: string
//   phone: string
//   needsCaregiver: boolean
//   familyMembers: FamilyMember[]
// }
// 
// export default function ProfilePage() {
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSaving, setIsSaving] = useState(false)
//   const [userProfile, setUserProfile] = useState<UserProfile>({
//     email: "",
//     name: "",
//     age: "",
//     phone: "",
//     needsCaregiver: false,
//     familyMembers: []
//   })
// 
//   const [isEditing, setIsEditing] = useState({
//     personal: false,
//     caregiver: false,
//     family: false
//   })
// 
//   const [editData, setEditData] = useState<UserProfile>(userProfile)
// 
  // Fetch user profile data on component mount
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setIsLoading(true)
//         const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
//         
//         if (!token) {
//           toast({
//             title: "Authentication required",
//             description: "Please log in to view your profile",
//             variant: "destructive"
//           })
//           return
//         }
// 
//         const response = await fetch('/api/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
// 
//         if (!response.ok) {
//           throw new Error(`Failed to fetch profile: ${response.status}`)
//         }
// 
//         const data = await response.json()
//         setUserProfile(data)
//         setEditData(data)
//       } catch (error) {
//         console.error('Error fetching profile:', error)
//         toast({
//           title: "Error loading profile",
//           description: "Could not load your profile information",
//           variant: "destructive"
//         })
//       } finally {
//         setIsLoading(false)
//       }
//     }
// 
//     fetchUserProfile()
//   }, [toast])
// 
//   const handleEdit = (section: keyof typeof isEditing) => {
//     setIsEditing(prev => ({ ...prev, [section]: true }))
//     setEditData(userProfile)
//   }
// 
//   const handleSave = async (section: keyof typeof isEditing) => {
//     try {
//       setIsSaving(true)
//       const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
//       
//       if (!token) {
//         toast({
//           title: "Authentication required",
//           description: "Please log in to save changes",
//           variant: "destructive"
//         })
//         return
//       }
// 
      // Prepare data for API based on which section is being saved
//       let updatePayload: any = {}
//       
//       if (section === 'personal') {
//         updatePayload = {
//           email: editData.email,
//           age: editData.age,
//           phone: editData.phone
//         }
//       } else if (section === 'caregiver') {
//         updatePayload = {
//           needsCaregiver: editData.needsCaregiver
//         }
//       } else if (section === 'family') {
//         updatePayload = {
//           familyMembers: editData.familyMembers
//         }
//       }
// 
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatePayload)
//       })
// 
//       if (!response.ok) {
//         throw new Error(`Failed to update profile: ${response.status}`)
//       }
// 
//       const updatedData = await response.json()
//       setUserProfile(updatedData)
//       setIsEditing(prev => ({ ...prev, [section]: false }))
//       
//       toast({
//         title: "Profile updated",
//         description: "Your changes have been saved successfully"
//       })
//     } catch (error) {
//       console.error('Error saving profile:', error)
//       toast({
//         title: "Error saving changes",
//         description: "Could not save your profile information",
//         variant: "destructive"
//       })
//     } finally {
//       setIsSaving(false)
//     }
//   }
// 
//   const handleCancel = (section: keyof typeof isEditing) => {
//     setEditData(userProfile)
//     setIsEditing(prev => ({ ...prev, [section]: false }))
//   }
// 
//   const addFamilyMember = () => {
//     const newMember: FamilyMember = {
//       id: `temp-${Date.now()}`,
//       name: "",
//       relation: "other"
//     }
//     setEditData(prev => ({
//       ...prev,
//       familyMembers: [...prev.familyMembers, newMember]
//     }))
//   }
// 
//   const removeFamilyMember = (id: string) => {
//     setEditData(prev => ({
//       ...prev,
//       familyMembers: prev.familyMembers.filter(member => member.id !== id)
//     }))
//   }
// 
//   const updateFamilyMember = (id: string, field: "name" | "relation", value: string) => {
//     setEditData(prev => ({
//       ...prev,
//       familyMembers: prev.familyMembers.map(member =>
//         member.id === id ? { ...member, [field]: value } : member
//       )
//     }))
//   }
// 
//   const getRelationDisplayName = (relation: string) => {
//     return relation.charAt(0).toUpperCase() + relation.slice(1)
//   }
// 
//   const getRelationColor = (relation: string) => {
//     const colors = {
//       spouse: "bg-pink-100 text-pink-800",
//       child: "bg-blue-100 text-blue-800",
//       parent: "bg-indigo-100 text-indigo-800",
//       sibling: "bg-yellow-100 text-yellow-800",
//       grandparent: "bg-purple-100 text-purple-800",
//       grandchild: "bg-orange-100 text-orange-800",
//       other: "bg-gray-100 text-gray-800"
//     }
//     return colors[relation as keyof typeof colors] || "bg-gray-100 text-gray-800"
//   }
// 
  // Event handlers with proper typing
//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEditData(prev => ({ ...prev, email: e.target.value }))
//   }
// 
//   const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEditData(prev => ({ ...prev, name: e.target.value }))
//   }
// 
//   const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEditData(prev => ({ ...prev, age: e.target.value }))
//   }
// 
//   const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEditData(prev => ({ ...prev, phone: e.target.value }))
//   }
// 
//   const handleFamilyMemberNameChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
//     updateFamilyMember(id, "name", e.target.value)
//   }
// 
//   const handleCaregiverChange = (checked: boolean) => {
//     setEditData(prev => ({ ...prev, needsCaregiver: checked }))
//   }
// 
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600">Loading your profile...</p>
//         </div>
//       </div>
//     )
//   }
// 
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       
//       <div className="relative bg-gradient-to-r from-blue-600 via-blue-300 to-indigo-700 overflow-hidden">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="absolute inset-0">
//           <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
//           <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
//           <div className="absolute bottom-10 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
//         </div>
// 
//         <div className="relative max-w-4xl mx-auto px-6 py-12">
//           <div className="flex flex-col md:flex-row items-center gap-8">
//             
//             <div className="relative">
//               <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
//                 <AvatarImage src="" />
//                 <AvatarFallback className="bg-white/20 text-white text-2xl">
//                   {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <Button
//                 size="sm"
//                 className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30 p-0"
//               >
//                 <Camera className="w-4 h-4 text-white" />
//               </Button>
//             </div>
// 
//             {/* Profile Info */}
//             <div className="text-center md:text-left text-white">
//               <h1 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//                 {userProfile.name || "User"}
//               </h1>
//               <p className="text-blue-100 text-lg mb-4 opacity-90">
//                 Manage your personal information and preferences
//               </p>
//               <div className="flex flex-wrap gap-2 justify-center md:justify-start">
//                 <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
//                   <Mail className="w-3 h-3 mr-1" />
//                   Verified
//                 </Badge>
//                 <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
//                   <Shield className="w-3 h-3 mr-1" />
//                   Secure
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
// 
//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Card className="bg-gradient-to-br from-blue-400 to-blue-700 text-white border-0 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-blue-100">Age</p>
//                   <p className="text-2xl">{userProfile.age || "N/A"}</p>
//                 </div>
//                 <Calendar className="w-8 h-8 text-blue-200" />
//               </div>
//             </CardContent>
//           </Card>
// 
//           <Card className="bg-gradient-to-br from-indigo-300 to-indigo-600 text-white border-0 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-indigo-100">Family</p>
//                   <p className="text-2xl">{userProfile.familyMembers.length}</p>
//                 </div>
//                 <Users className="w-8 h-8 text-indigo-200" />
//               </div>
//             </CardContent>
//           </Card>
// 
//           <Card className="bg-gradient-to-br from-purple-500 to-blue-300 text-white border-0 hover:shadow-xl transition-all duration-300">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-purple-100">Care Level</p>
//                   <p className="text-2xl">{userProfile.needsCaregiver ? "Full" : "None"}</p>
//                 </div>
//                 <Shield className="w-8 h-8 text-purple-200" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
// 
//         {/* Personal Information Section */}
//         <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
//           <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg">
//             <div className="flex flex-row items-center justify-between pb-2">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-blue-500 rounded-lg">
//                   <User className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl text-gray-800">Personal Information</CardTitle>
//                   <p className="text-sm text-gray-600 mt-1">Your basic account details</p>
//                 </div>
//               </div>
//               {!isEditing.personal ? (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEdit('personal')}
//                   className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
//                 >
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               ) : (
//                 <div className="space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleCancel('personal')}
//                     className="text-gray-600 hover:bg-gray-50"
//                   >
//                     <X className="w-4 h-4 mr-1" />
//                     Cancel
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleSave('personal')}
//                     disabled={isSaving}
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
//                   >
//                     {isSaving ? (
//                       <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                     ) : (
//                       <Save className="w-4 h-4 mr-1" />
//                     )}
//                     Save
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label className="text-gray-700 flex items-center gap-2">
//                   <Mail className="w-4 h-4 text-gray-500" />
//                   Email Address
//                 </Label>
//                 {isEditing.personal ? (
//                   <Input
//                     type="email"
//                     value={editData.email}
//                     onChange={handleEmailChange}
//                     className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
//                   />
//                 ) : (
//                   <div className="p-3 bg-gray-50 rounded-lg border">
//                     <p className="text-gray-900">{userProfile.email || "Not provided"}</p>
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700 flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-gray-500" />
//                   Age
//                 </Label>
//                 {isEditing.personal ? (
//                   <Input
//                     type="number"
//                     value={editData.age}
//                     onChange={handleAgeChange}
//                     className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
//                   />
//                 ) : (
//                   <div className="p-3 bg-gray-50 rounded-lg border">
//                     <p className="text-gray-900">{userProfile.age ? `${userProfile.age} years old` : "Not provided"}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label className="text-gray-700 flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-gray-500" />
//                 Phone Number
//               </Label>
//               {isEditing.personal ? (
//                 <Input
//                   type="tel"
//                   value={editData.phone}
//                   onChange={handlePhoneChange}
//                   className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
//                 />
//               ) : (
//                 <div className="p-3 bg-gray-50 rounded-lg border">
//                   <p className="text-gray-900">{userProfile.phone || "Not provided"}</p>
//                 </div>
//               )}
//             </div>
//             <Separator className="my-6" />
//             <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-amber-500 rounded-lg">
//                   <Shield className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <Label className="text-gray-700">Security</Label>
//                   <p className="text-sm text-gray-600 mt-1">Password last changed 30 days ago</p>
//                 </div>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="text-amber-600 border-amber-200 hover:bg-amber-50"
//               >
//                 Change Password
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
// 
//         {/* Caregiver Assistance Section */}
//         <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
//           <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-t-lg">
//             <div className="flex flex-row items-center justify-between pb-2">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-indigo-500 rounded-lg">
//                   <Shield className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl text-gray-800">Care Preferences</CardTitle>
//                   <p className="text-sm text-gray-600 mt-1">Manage your care assistance settings</p>
//                 </div>
//               </div>
//               {!isEditing.caregiver ? (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEdit('caregiver')}
//                   className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:scale-105 transition-all duration-200"
//                 >
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               ) : (
//                 <div className="space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleCancel('caregiver')}
//                     className="text-gray-600 hover:bg-gray-50"
//                   >
//                     <X className="w-4 h-4 mr-1" />
//                     Cancel
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleSave('caregiver')}
//                     disabled={isSaving}
//                     className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg"
//                   >
//                     {isSaving ? (
//                       <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                     ) : (
//                       <Save className="w-4 h-4 mr-1" />
//                     )}
//                     Save
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-lg border border-indigo-200">
//               <Checkbox
//                 id="caregiver"
//                 checked={isEditing.caregiver ? editData.needsCaregiver : userProfile.needsCaregiver}
//                 onCheckedChange={(checked) =>
//                   isEditing.caregiver && handleCaregiverChange(checked as boolean)
//                 }
//                 disabled={!isEditing.caregiver || isSaving}
//                 className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
//               />
//               <div className="flex-1">
//                 <Label
//                   htmlFor="caregiver"
//                   className="text-gray-700 cursor-pointer"
//                 >
//                   I need caregiver assistance
//                 </Label>
//                 <p className="text-sm text-gray-500 mt-1">
//                   This setting helps us provide appropriate support and resources for your care needs.
//                 </p>
//               </div>
//               {(isEditing.caregiver ? editData.needsCaregiver : userProfile.needsCaregiver) && (
//                 <Badge className="bg-indigo-100 text-indigo-800">
//                   Active
//                 </Badge>
//               )}
//             </div>
//           </CardContent>
//         </Card>
// 
//         {/* Family Members Section */}
//         <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
//           <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-lg">
//             <div className="flex flex-row items-center justify-between pb-2">
//               <div className="flex items-center space-x-3">
//                 <div className="p-2 bg-purple-500 rounded-lg">
//                   <Users className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-xl text-gray-800">Family Members</CardTitle>
//                   <p className="text-sm text-gray-600 mt-1">{userProfile.familyMembers.length} family members connected</p>
//                 </div>
//               </div>
//               {!isEditing.family ? (
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleEdit('family')}
//                   className="text-blue-300 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all duration-200"
//                 >
//                   <Edit2 className="w-4 h-4 mr-1" />
//                   Edit
//                 </Button>
//               ) : (
//                 <div className="space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleCancel('family')}
//                     className="text-gray-600 hover:bg-gray-50"
//                   >
//                     <X className="w-4 h-4 mr-1" />
//                     Cancel
//                   </Button>
//                   <Button
//                     size="sm"
//                     onClick={() => handleSave('family')}
//                     disabled={isSaving}
//                     className="bg-gradient-to-r from-purple-500 to-blue-300 hover:from-blue-300 hover:to-purple-700 text-white shadow-lg"
//                   >
//                     {isSaving ? (
//                       <Loader2 className="w-4 h-4 mr-1 animate-spin" />
//                     ) : (
//                       <Save className="w-4 h-4 mr-1" />
//                     )}
//                     Save
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardHeader>
//           <CardContent className="p-6 space-y-4">
//             {isEditing.family && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={addFamilyMember}
//                 className="text-blue-300 border-purple-200 hover:bg-purple-50 mb-6 w-full md:w-auto"
//               >
//                 <Plus className="w-4 h-4 mr-1" />
//                 Add Family Member
//               </Button>
//             )}
// 
//             {(isEditing.family ? editData.familyMembers : userProfile.familyMembers).length === 0 ? (
//               <div className="text-center py-12">
//                 <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">No family members added yet.</p>
//                 <p className="text-sm text-gray-400 mt-1">Add family members to help manage your care network</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {(isEditing.family ? editData.familyMembers : userProfile.familyMembers).map((member) => (
//                   <div key={member.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border hover:shadow-md transition-all duration-200">
//                     {isEditing.family ? (
//                       <div className="space-y-3">
//                         <div>
//                           <Label className="text-sm text-gray-600">Name</Label>
//                           <Input
//                             placeholder="Family member name"
//                             value={member.name}
//                             onChange={(e) => handleFamilyMemberNameChange(e, member.id)}
//                             className="mt-1 bg-white border-gray-200 rounded-lg"
//                           />
//                         </div>
//                         <div className="flex space-x-2">
//                           <div className="flex-1">
//                             <Label className="text-sm text-gray-600">Relation</Label>
//                             <Select
//                               value={member.relation}
//                               onValueChange={(value) => updateFamilyMember(member.id, "relation", value)}
//                             >
//                               <SelectTrigger className="mt-1 bg-white border-gray-200 rounded-lg">
//                                 <SelectValue placeholder="Select relation" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="spouse">Spouse</SelectItem>
//                                 <SelectItem value="child">Child</SelectItem>
//                                 <SelectItem value="parent">Parent</SelectItem>
//                                 <SelectItem value="sibling">Sibling</SelectItem>
//                                 <SelectItem value="grandparent">Grandparent</SelectItem>
//                                 <SelectItem value="grandchild">Grandchild</SelectItem>
//                                 <SelectItem value="other">Other</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="flex items-end">
//                             <Button
//                               type="button"
//                               variant="outline"
//                               size="sm"
//                               onClick={() => removeFamilyMember(member.id)}
//                               className="text-red-600 border-red-200 hover:bg-red-50"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <Avatar className="w-12 h-12">
//                             <AvatarFallback className="bg-purple-100 text-purple-700">
//                               {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
//                             </AvatarFallback>
//                           </Avatar>
//                           <div>
//                             <p className="text-gray-900 font-medium">{member.name}</p>
//                             <Badge className={`text-xs mt-1 ${getRelationColor(member.relation)}`}>
//                               {getRelationDisplayName(member.relation)}
//                             </Badge>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
// 
// "use client"
// 
 import { useState, ChangeEvent } from "react"
 import { Button } from "@/components/ui/button"
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
 import { Checkbox } from "@/components/ui/checkbox"
 import { Input } from "@/components/ui/input"
 import { Label } from "@/components/ui/label"
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
 import { Separator } from "@/components/ui/separator"
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
 import { Badge } from "@/components/ui/badge"
 import { Edit2, Save, X, Plus, Trash2, User, Shield, Users, Camera, Mail, Phone, Calendar } from "lucide-react"

 interface FamilyMember {
     id: string
     name: string
     relation: string
 }

 interface UserProfile {
     email: string
     age: string
     phone: string
     needsCaregiver: boolean
     familyMembers: FamilyMember[]
 }

 export default function ProfilePage() { // Changed from named export to default export
     // Mock user data - in real app this would come from API/database
     const [userProfile, setUserProfile] = useState<UserProfile>({
         email: "john.doe@example.com",
         age: "35",
         phone: "+1 (555) 123-4567",
         needsCaregiver: false,
         familyMembers: [
             { id: "1", name: "Jane Doe", relation: "spouse" },
             { id: "2", name: "Emily Doe", relation: "child" }
         ]
     })

     const [isEditing, setIsEditing] = useState({
         personal: false,
         caregiver: false,
         family: false
     })

     const [editData, setEditData] = useState<UserProfile>(userProfile)

     const handleEdit = (section: keyof typeof isEditing) => {
         setIsEditing(prev => ({ ...prev, [section]: true }))
         setEditData(userProfile)
     }

     const handleSave = (section: keyof typeof isEditing) => {
         setUserProfile(editData)
         setIsEditing(prev => ({ ...prev, [section]: false }))
     }

     const handleCancel = (section: keyof typeof isEditing) => {
         setEditData(userProfile)
         setIsEditing(prev => ({ ...prev, [section]: false }))
     }

     const addFamilyMember = () => {
         const newMember: FamilyMember = {
             id: Date.now().toString(),
             name: "",
             relation: ""
         }
         setEditData(prev => ({
             ...prev,
             familyMembers: [...prev.familyMembers, newMember]
         }))
     }

     const removeFamilyMember = (id: string) => {
         setEditData(prev => ({
             ...prev,
             familyMembers: prev.familyMembers.filter(member => member.id !== id)
         }))
     }

     const updateFamilyMember = (id: string, field: "name" | "relation", value: string) => {
         setEditData(prev => ({
             ...prev,
             familyMembers: prev.familyMembers.map(member =>
                 member.id === id ? { ...member, [field]: value } : member
             )
         }))
     }

     const getRelationDisplayName = (relation: string) => {
         return relation.charAt(0).toUpperCase() + relation.slice(1)
     }

     const getRelationColor = (relation: string) => {
         const colors = {
             spouse: "bg-pink-100 text-pink-800",
             child: "bg-blue-100 text-blue-800",
             parent: "bg-indigo-100 text-indigo-800",
             sibling: "bg-yellow-100 text-yellow-800",
             grandparent: "bg-purple-100 text-purple-800",
             grandchild: "bg-orange-100 text-orange-800",
             other: "bg-gray-100 text-gray-800"
         }
         return colors[relation as keyof typeof colors] || "bg-gray-100 text-gray-800"
     }

     // Event handlers with proper typing
     const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
         setEditData(prev => ({ ...prev, email: e.target.value }))
     }

     const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
         setEditData(prev => ({ ...prev, age: e.target.value }))
     }

     const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
         setEditData(prev => ({ ...prev, phone: e.target.value }))
     }

     const handleFamilyMemberNameChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
         updateFamilyMember(id, "name", e.target.value)
     }

     const handleCaregiverChange = (checked: boolean) => {
         setEditData(prev => ({ ...prev, needsCaregiver: checked }))
     }

     return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
             {/* Hero Header Section */}
             <div className="relative bg-gradient-to-r from-blue-600 via-blue-300 to-indigo-700 overflow-hidden">
                 <div className="absolute inset-0 bg-black/10"></div>
                 <div className="absolute inset-0">
                     <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                     <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                     <div className="absolute bottom-10 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                 </div>

                 <div className="relative max-w-4xl mx-auto px-6 py-12">
                     <div className="flex flex-col md:flex-row items-center gap-8">
                         {/* Profile Avatar */}
                         <div className="relative">
                             <Avatar className="w-32 h-32 border-4 border-white/20 shadow-2xl">
                                 <AvatarImage src="" />
                                 <AvatarFallback className="bg-white/20 text-white text-2xl">
                                    JD
                                 </AvatarFallback>
                             </Avatar>
                             <Button
                                 size="sm"
                                 className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30 p-0"
                             >
                                 <Camera className="w-4 h-4 text-white" />
                             </Button>
                         </div>

                         {/* Profile Info */}
                         <div className="text-center md:text-left text-white">
                             <h1 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                                 John Doe
                             </h1>
                             <p className="text-blue-100 text-lg mb-4 opacity-90">
                                 Manage your personal information and preferences
                             </p>
                             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                 <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                     <Mail className="w-3 h-3 mr-1" />
                                     Verified
                                 </Badge>
                                 <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                     <Shield className="w-3 h-3 mr-1" />
                                     Secure
                                 </Badge>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>

             {/* Main Content */}
             <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                 {/* Quick Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <Card className="bg-gradient-to-br from-blue-400 to-blue-700 text-white border-0 hover:shadow-xl transition-all duration-300">
                         <CardContent className="p-6">
                             <div className="flex items-center justify-between">
                                 <div>
                                     <p className="text-blue-100">Age</p>
                                     <p className="text-2xl">{userProfile.age}</p>
                                 </div>
                                 <Calendar className="w-8 h-8 text-blue-200" />
                             </div>
                         </CardContent>
                     </Card>

                     <Card className="bg-gradient-to-br from-indigo-300 to-indigo-600 text-white border-0 hover:shadow-xl transition-all duration-300">
                         <CardContent className="p-6">
                             <div className="flex items-center justify-between">
                                 <div>
                                     <p className="text-indigo-100">Family</p>
                                     <p className="text-2xl">{userProfile.familyMembers.length}</p>
                                 </div>
                                 <Users className="w-8 h-8 text-indigo-200" />
                             </div>
                         </CardContent>
                     </Card>

                     <Card className="bg-gradient-to-br from-purple-500 to-blue-300 text-white border-0 hover:shadow-xl transition-all duration-300">
                         <CardContent className="p-6">
                             <div className="flex items-center justify-between">
                                 <div>
                                     <p className="text-purple-100">Care Level</p>
                                     <p className="text-2xl">{userProfile.needsCaregiver ? "Full" : "None"}</p>
                                 </div>
                                 <Shield className="w-8 h-8 text-purple-200" />
                             </div>
                         </CardContent>
                     </Card>
                 </div>

                 {/* Personal Information Section */}
                 <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                     <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-lg">
                         <div className="flex flex-row items-center justify-between pb-2">
                             <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-blue-500 rounded-lg">
                                     <User className="w-5 h-5 text-white" />
                                 </div>
                                 <div>
                                     <CardTitle className="text-xl text-gray-800">Personal Information</CardTitle>
                                     <p className="text-sm text-gray-600 mt-1">Your basic account details</p>
                                 </div>
                             </div>
                             {!isEditing.personal ? (
                                 <Button
                                     variant="outline"
                                     size="sm"
                                     onClick={() => handleEdit('personal')}
                                     className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all duration-200"
                                 >
                                     <Edit2 className="w-4 h-4 mr-1" />
                                     Edit
                                 </Button>
                             ) : (
                                 <div className="space-x-2">
                                     <Button
                                         variant="outline"
                                         size="sm"
                                         onClick={() => handleCancel('personal')}
                                         className="text-gray-600 hover:bg-gray-50"
                                     >
                                         <X className="w-4 h-4 mr-1" />
                                         Cancel
                                     </Button>
                                     <Button
                                         size="sm"
                                         onClick={() => handleSave('personal')}
                                         className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                                     >
                                         <Save className="w-4 h-4 mr-1" />
                                         Save
                                     </Button>
                                 </div>
                             )}
                         </div>
                     </CardHeader>
                     <CardContent className="p-6 space-y-6">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                 <Label className="text-gray-700 flex items-center gap-2">
                                     <Mail className="w-4 h-4 text-gray-500" />
                                     Email Address
                                 </Label>
                                 {isEditing.personal ? (
                                     <Input
                                         type="email"
                                         value={editData.email}
                                         onChange={handleEmailChange}
                                         className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                     />
                                 ) : (
                                     <div className="p-3 bg-gray-50 rounded-lg border">
                                         <p className="text-gray-900">{userProfile.email}</p>
                                     </div>
                                 )}
                             </div>
                             <div className="space-y-2">
                                 <Label className="text-gray-700 flex items-center gap-2">
                                     <Calendar className="w-4 h-4 text-gray-500" />
                                     Age
                                 </Label>
                                 {isEditing.personal ? (
                                     <Input
                                         type="number"
                                         value={editData.age}
                                         onChange={handleAgeChange}
                                         className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                     />
                                 ) : (
                                     <div className="p-3 bg-gray-50 rounded-lg border">
                                         <p className="text-gray-900">{userProfile.age} years old</p>
                                     </div>
                                 )}
                             </div>
                         </div>
                         <div className="space-y-2">
                             <Label className="text-gray-700 flex items-center gap-2">
                                 <Phone className="w-4 h-4 text-gray-500" />
                                 Phone Number
                             </Label>
                             {isEditing.personal ? (
                                 <Input
                                     type="tel"
                                     value={editData.phone}
                                     onChange={handlePhoneChange}
                                     className="bg-white border-gray-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                 />
                             ) : (
                                 <div className="p-3 bg-gray-50 rounded-lg border">
                                     <p className="text-gray-900">{userProfile.phone}</p>
                                 </div>
                             )}
                         </div>
                         <Separator className="my-6" />
                         <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                             <div className="flex items-center gap-3">
                                 <div className="p-2 bg-amber-500 rounded-lg">
                                     <Shield className="w-4 h-4 text-white" />
                                 </div>
                                 <div>
                                     <Label className="text-gray-700">Security</Label>
                                     <p className="text-sm text-gray-600 mt-1">Password last changed 30 days ago</p>
                                 </div>
                             </div>
                             <Button
                                 variant="outline"
                                 size="sm"
                                 className="text-amber-600 border-amber-200 hover:bg-amber-50"
                             >
                                 Change Password
                             </Button>
                         </div>
                     </CardContent>
                 </Card>

                 {/* Caregiver Assistance Section */}
                 <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                     <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-t-lg">
                         <div className="flex flex-row items-center justify-between pb-2">
                             <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-indigo-500 rounded-lg">
                                     <Shield className="w-5 h-5 text-white" />
                                 </div>
                                 <div>
                                     <CardTitle className="text-xl text-gray-800">Care Preferences</CardTitle>
                                     <p className="text-sm text-gray-600 mt-1">Manage your care assistance settings</p>
                                 </div>
                             </div>
                             {!isEditing.caregiver ? (
                                 <Button
                                     variant="outline"
                                     size="sm"
                                     onClick={() => handleEdit('caregiver')}
                                     className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:scale-105 transition-all duration-200"
                                 >
                                     <Edit2 className="w-4 h-4 mr-1" />
                                     Edit
                                 </Button>
                             ) : (
                                 <div className="space-x-2">
                                     <Button
                                         variant="outline"
                                         size="sm"
                                         onClick={() => handleCancel('caregiver')}
                                         className="text-gray-600 hover:bg-gray-50"
                                     >
                                         <X className="w-4 h-4 mr-1" />
                                         Cancel
                                     </Button>
                                     <Button
                                         size="sm"
                                         onClick={() => handleSave('caregiver')}
                                         className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-lg"
                                     >
                                         <Save className="w-4 h-4 mr-1" />
                                         Save
                                     </Button>
                                 </div>
                             )}
                         </div>
                     </CardHeader>
                     <CardContent className="p-6">
                         <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-lg border border-indigo-200">
                             <Checkbox
                                 id="caregiver"
                                 checked={isEditing.caregiver ? editData.needsCaregiver : userProfile.needsCaregiver}
                                 onCheckedChange={(checked) =>
                                     isEditing.caregiver && handleCaregiverChange(checked as boolean)
                                 }
                                 disabled={!isEditing.caregiver}
                                 className="data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500"
                             />
                             <div className="flex-1">
                                 <Label
                                     htmlFor="caregiver"
                                     className="text-gray-700 cursor-pointer"
                                 >
                                     I need caregiver assistance
                                 </Label>
                                 <p className="text-sm text-gray-500 mt-1">
                                     This setting helps us provide appropriate support and resources for your care needs.
                                 </p>
                             </div>
                             {(isEditing.caregiver ? editData.needsCaregiver : userProfile.needsCaregiver) && (
                                 <Badge className="bg-indigo-100 text-indigo-800">
                                     Active
                                 </Badge>
                             )}
                         </div>
                     </CardContent>
                 </Card>

                 {/* Family Members Section */}
                 <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                     <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-t-lg">
                         <div className="flex flex-row items-center justify-between pb-2">
                             <div className="flex items-center space-x-3">
                                 <div className="p-2 bg-purple-500 rounded-lg">
                                     <Users className="w-5 h-5 text-white" />
                                 </div>
                                 <div>
                                     <CardTitle className="text-xl text-gray-800">Family Members</CardTitle>
                                     <p className="text-sm text-gray-600 mt-1">{userProfile.familyMembers.length} family members connected</p>
                                 </div>
                             </div>
                             {!isEditing.family ? (
                                 <Button
                                     variant="outline"
                                     size="sm"
                                     onClick={() => handleEdit('family')}
                                     className="text-blue-300 border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all duration-200"
                                 >
                                     <Edit2 className="w-4 h-4 mr-1" />
                                     Edit
                                 </Button>
                             ) : (
                                 <div className="space-x-2">
                                     <Button
                                         variant="outline"
                                         size="sm"
                                         onClick={() => handleCancel('family')}
                                         className="text-gray-600 hover:bg-gray-50"
                                     >
                                         <X className="w-4 h-4 mr-1" />
                                         Cancel
                                     </Button>
                                     <Button
                                         size="sm"
                                         onClick={() => handleSave('family')}
                                         className="bg-gradient-to-r from-purple-500 to-blue-300 hover:from-blue-300 hover:to-purple-700 text-white shadow-lg"
                                     >
                                         <Save className="w-4 h-4 mr-1" />
                                         Save
                                     </Button>
                                 </div>
                             )}
                         </div>
                     </CardHeader>
                     <CardContent className="p-6 space-y-4">
                         {isEditing.family && (
                             <Button
                                 type="button"
                                 variant="outline"
                                 size="sm"
                                 onClick={addFamilyMember}
                                 className="text-blue-300 border-purple-200 hover:bg-purple-50 mb-6 w-full md:w-auto"
                             >
                                 <Plus className="w-4 h-4 mr-1" />
                                 Add Family Member
                             </Button>
                         )}

                         {(isEditing.family ? editData.familyMembers : userProfile.familyMembers).length === 0 ? (
                             <div className="text-center py-12">
                                 <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                 <p className="text-gray-500">No family members added yet.</p>
                                 <p className="text-sm text-gray-400 mt-1">Add family members to help manage your care network</p>
                             </div>
                         ) : (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 {(isEditing.family ? editData.familyMembers : userProfile.familyMembers).map((member) => (
                                     <div key={member.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border hover:shadow-md transition-all duration-200">
                                         {isEditing.family ? (
                                             <div className="space-y-3">
                                                 <div>
                                                     <Label className="text-sm text-gray-600">Name</Label>
                                                     <Input
                                                         placeholder="Family member name"
                                                         value={member.name}
                                                         onChange={(e) => handleFamilyMemberNameChange(e, member.id)}
                                                         className="mt-1 bg-white border-gray-200 rounded-lg"
                                                     />
                                                 </div>
                                                 <div className="flex space-x-2">
                                                     <div className="flex-1">
                                                         <Label className="text-sm text-gray-600">Relation</Label>
                                                         <Select
                                                             value={member.relation}
                                                             onValueChange={(value) => updateFamilyMember(member.id, "relation", value)}
                                                         >
                                                             <SelectTrigger className="mt-1 bg-white border-gray-200 rounded-lg">
                                                                 <SelectValue placeholder="Select relation" />
                                                             </SelectTrigger>
                                                             <SelectContent>
                                                                 <SelectItem value="spouse">Spouse</SelectItem>
                                                                 <SelectItem value="child">Child</SelectItem>
                                                                 <SelectItem value="parent">Parent</SelectItem>
                                                                 <SelectItem value="sibling">Sibling</SelectItem>
                                                                 <SelectItem value="grandparent">Grandparent</SelectItem>
                                                                 <SelectItem value="grandchild">Grandchild</SelectItem>
                                                                 <SelectItem value="other">Other</SelectItem>
                                                             </SelectContent>
                                                         </Select>
                                                     </div>
                                                     <div className="flex items-end">
                                                         <Button
                                                             type="button"
                                                             variant="outline"
                                                             size="sm"
                                                             onClick={() => removeFamilyMember(member.id)}
                                                             className="text-red-600 border-red-200 hover:bg-red-50"
                                                         >
                                                             <Trash2 className="w-4 h-4" />
                                                         </Button>
                                                     </div>
                                                 </div>
                                             </div>
                                         ) : (
                                             <div className="flex items-center justify-between">
                                                 <div className="flex items-center gap-3">
                                                     <Avatar className="w-12 h-12">
                                                         <AvatarFallback className="bg-purple-100 text-purple-700">
                                                             {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                         </AvatarFallback>
                                                     </Avatar>
                                                     <div>
                                                         <p className="text-gray-900 font-medium">{member.name}</p>
                                                         <Badge className={`text-xs mt-1 ${getRelationColor(member.relation)}`}>
                                                             {getRelationDisplayName(member.relation)}
                                                         </Badge>
                                                     </div>
                                                 </div>
                                             </div>
                                         )}
                                     </div>
                                 ))}
                             </div>
                         )}
                     </CardContent>
                 </Card>
             </div>
         </div>
     )
 }


