"use client"

import { Navbar } from "@/components/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, EyeOff, Heart, Star } from "lucide-react"
import { useState } from "react"

const userArtworks = [
  {
    id: 1,
    title: "Abstract Dreams",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    likes: 24,
    views: 156,
    status: "active",
  },
  {
    id: 2,
    title: "Urban Sketches",
    price: 75,
    image: "/placeholder.svg?height=200&width=200",
    likes: 18,
    views: 89,
    status: "sold",
  },
  {
    id: 3,
    title: "Digital Portraits",
    price: 200,
    image: "/placeholder.svg?height=200&width=200",
    likes: 32,
    views: 203,
    status: "active",
  },
]

const purchaseHistory = [
  {
    id: 1,
    title: "Ceramic Bowl",
    artist: "David Kim",
    price: 45,
    image: "/placeholder.svg?height=200&width=200",
    date: "2024-01-15",
    status: "delivered",
  },
  {
    id: 2,
    title: "Photography Print",
    artist: "Lisa Thompson",
    price: 90,
    image: "/placeholder.svg?height=200&width=200",
    date: "2024-01-08",
    status: "delivered",
  },
]

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showFollowerCount, setShowFollowerCount] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "Sarah Chen",
    course: "Fine Art",
    year: "3rd Year",
    bio: "Passionate about abstract art and color theory. Currently exploring mixed media techniques.",
    location: "London, UK",
    website: "www.sarahchen-art.com",
    instagram: "@sarahchen_art",
  })

  const stats = {
    followers: 234,
    following: 89,
    artworksSold: 12,
    totalEarnings: 1850,
    averageRating: 4.8,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="mb-2">
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="course">Course</Label>
                        <Select
                          value={profileData.course}
                          onValueChange={(value) => setProfileData({ ...profileData, course: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fine Art">Fine Art</SelectItem>
                            <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                            <SelectItem value="Fashion">Fashion Design</SelectItem>
                            <SelectItem value="Photography">Photography</SelectItem>
                            <SelectItem value="Illustration">Illustration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagram">Instagram</Label>
                        <Input
                          id="instagram"
                          value={profileData.instagram}
                          onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h1 className="text-3xl font-bold">{profileData.name}</h1>
                      <Badge variant="secondary">{profileData.course}</Badge>
                      <Badge variant="outline">{profileData.year}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>📍 {profileData.location}</span>
                      <span>🌐 {profileData.website}</span>
                      <span>📸 {profileData.instagram}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <div className="text-2xl font-bold">{showFollowerCount ? stats.followers : "***"}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setShowFollowerCount(!showFollowerCount)}
                  >
                    {showFollowerCount ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.following}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.artworksSold}</div>
                <div className="text-sm text-muted-foreground">Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">£{stats.totalEarnings}</div>
                <div className="text-sm text-muted-foreground">Earned</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <div className="text-2xl font-bold">{stats.averageRating}</div>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="artworks" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="artworks">My Artworks</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="artworks">
            <Card>
              <CardHeader>
                <CardTitle>My Artworks</CardTitle>
                <CardDescription>Manage your listed artworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userArtworks.map((artwork) => (
                    <Card key={artwork.id} className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge variant={artwork.status === "sold" ? "default" : "secondary"}>{artwork.status}</Badge>
                      </div>
                      <CardContent className="p-0">
                        <img
                          src={artwork.image || "/placeholder.svg"}
                          alt={artwork.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold mb-2">{artwork.title}</h3>
                          <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                            <span>£{artwork.price}</span>
                            <div className="flex gap-4">
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                {artwork.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {artwork.views}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              View
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases">
            <Card>
              <CardHeader>
                <CardTitle>Purchase History</CardTitle>
                <CardDescription>Your artwork purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div key={purchase.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <img
                        src={purchase.image || "/placeholder.svg"}
                        alt={purchase.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{purchase.title}</h3>
                        <p className="text-sm text-muted-foreground">by {purchase.artist}</p>
                        <p className="text-sm text-muted-foreground">{purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">£{purchase.price}</div>
                        <Badge variant="outline">{purchase.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Artworks</CardTitle>
                <CardDescription>Artworks you've liked</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No favorites yet</p>
                  <p className="text-sm text-muted-foreground">Start exploring to find artworks you love</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show follower count to others</Label>
                        <p className="text-sm text-muted-foreground">Others can see how many followers you have</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {showFollowerCount ? "Public" : "Private"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Profile visibility</Label>
                        <p className="text-sm text-muted-foreground">Who can see your profile and artworks</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Public
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Email notifications</Label>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Push notifications</Label>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Account</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
