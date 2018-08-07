
import sys
from textgenrnn import textgenrnn
import random

textgen = textgenrnn()
textgen.load("weights.hdf5")
print(textgen.generate(1, temperature=0.5, prefix="Eyemole: ", return_as_list = True)[0])
