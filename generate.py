import tensorflow as tf
from textgenrnn import textgenrnn
import random
import sys

textgen = textgenrnn()
textgen.load("weights.hdf5")
print(textgen.generate(1, temperature=0.6, prefix="Eyemole: ", return_as_list = True)[0])
sys.stdout.flush()