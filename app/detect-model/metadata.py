from xml.etree.ElementTree import parse
from utils.parser import parse_xml
from utils.files import search_file


        
class MetaData:
    # TEMPORARY METADATA CLASS
    def __init__(self, metadata):
        self.folder = metadata["folder"]
        self.filename = metadata["filename"]
        
        self.source = self.Soruce(metadata["source"])
        self.size = self.ImageSize(metadata["size"])
        self.event = self.Event(metadata["event"])
        self.objects = [self.Obj(obj) for obj in metadata["object"]]
        
    def __str__(self):
        return (
            f"\n<FILE>     {self.filename}\n"
            f"  [FOLDER] \n    {self.folder} \n"
            f"  [SIZE] \n    {self.size} \n"
            f"  [SOURCE] \n{self.source} \n"
            f"  [EVENT] \n{self.event}"
            f"  [OBJECTS] \n{list_string(self.objects)}"
        )

    class Soruce:
        def __init__(self, source):
            self.data = source[0]
            
            self.database = self.data.get("database")
            self.annotation = self.data.get("annotation")
            
        def __str__(self):
            return (
                f"    annotation : {self.annotation} \n"
                f"    database   : {self.database}"
            )
            
    class ImageSize:
        def __init__(self, size):
            self.data = size[0]

            self.width = self.data.get("width")
            self.height = self.data.get("height")
            self.depth = self.data.get("depth")
            
        def __str__(self):
            return f"({self.width}, {self.height}, {self.depth})"

    class Event:
        def __init__(self, event):
            self.data = event[0]

            self.eventname = self.data.get("eventname")
            self.starttime = self.data.get("starttime")
            self.duration = self.data.get("duration")
            
        def __str__(self):
            return (
                f"    eventname  : {self.eventname} \n"
                f"    start time : {self.starttime} \n"
                f"    duration   : {self.duration} \n"
            )
            
    class Obj:
        def __init__(self, obj):
            self.data = obj
            self.objectname = obj.get("objectname")
            self.position = self.Postion(obj["position"])
            self.actions = [self.Action(act) for act in obj["action"]]
        
        def __str__(self):
            return (
                f"    [OBJ NAME]  {self.objectname} \n"
                f"    [POSITION]\n{self.position} \n"
                f"    [ACTION]  \n{list_string(self.actions)}"
            )

        class Postion:
            def __init__(self, position):
                self.data = position[0]
                self.keyframe = self.data.get("keyframe")
                self.keypoint = self.data.get("keypoint")[0]
                
            def __str__(self):
                return (
                    f"        keyframe {self.keyframe}\n"
                    f"        keypoint {self.keypoint['x'], self.keypoint['y']}"
                )
            
            
        class Action:
            def __init__(self, action):
                self.data = action
                self.actionname = self.data.get("actionname")
                self.frames = [(frame["start"], frame["end"]) for frame in self.data["frame"]]
            
            def __str__(self):
                string = f"        {self.actionname}\n"
                for x in self.frames:
                    string += f"            {x[0]} - {x[1]}\n"
                return string[:-1]


    def print_metadata(self, metadata, level=1):
        line = ">".rjust((level * 2), " ")

        for key in metadata:
            value = metadata[key]
            if type(value) is dict:
                self.print_metadata(value, level=level + 1)
            elif type(value) is list:
                print(f"{line} {key:10}")
                for vv in value:
                    self.print_metadata(vv, level=level + 1)
            else:
                print(f"{line} {key:10} : {value}")


def load_metadata(config):
    """
    Load metadata
    """

    metadata = list()

    # Debug option
    if config["debug"]["load-metadata"] is False:
        return metadata

    # Search xml file in directory
    files = search_file(config["train"], extension="xml")
    for file in files[:1]:
        metadata.append(parse_xml(file))

    return metadata

def list_string(listval, level=0):
    string = ""
    for val in listval:
        string += f"{val} \n"
    return string[:-2]